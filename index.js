const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/user");
require("./models/reviews");
require("./services/passport");

const Review = mongoose.model("reviews");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const REVIEWS_API_URI = "http://blog.decathlon.ru/assets/json/opinions.json";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App working on port: " + PORT);

  // Функция наполнения базы с отзывами
  let updateDb = async arr => {
    const reviewsInDb = await Review.where("grade");
    const reviewsInDbCount = reviewsInDb.length;
    console.log("Количество отзывов в базе: " + reviewsInDbCount);
    console.log("Ищем новые отзывы ...");
    const lastReview = await Review.findOne({ id: arr[arr.length - 1].id });
    if (!lastReview) {
      // if (arr.length > reviewsInDbCount) {
      console.log("Найдены новые отзывы! Сохраняем в базу...");

      for (i = arr.length - 1; i >= reviewsInDbCount; i--) {
        if (arr[i].comments) {
          await new Review({
            id: arr[i].id,
            grade: arr[i].grade,
            date: arr[i].date,
            recommend: arr[i].recommend,
            problem: arr[i].problem,
            delivery: arr[i].delivery,
            shopOrderId: arr[i].shopOrderId,
            text: arr[i].text,
            comments: [
              {
                answerDate: arr[i].comments[0].updateTimestamp,
                answerText: arr[i].comments[0].body
              }
            ]
          }).save();
        } else {
          await new Review({
            id: arr[i].id,
            grade: arr[i].grade,
            date: arr[i].date,
            recommend: arr[i].recommend,
            problem: arr[i].problem,
            delivery: arr[i].delivery,
            shopOrderId: arr[i].shopOrderId,
            text: arr[i].text
          }).save();
        }
      }
      console.log("Отзывы успешно сохранены!");
      console.log("Новое количество отзывов в базе: " + arr.length);
    } else {
      console.log("Новых отзывов не найдено");
    }
  };

  const fetchReviews = async () => {
    const response = await fetch(REVIEWS_API_URI, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    return updateDb(json.opinions);
  };

  setInterval(fetchReviews, 1000 * 60 * 10);

  // From YM API

  // let page = 1;
  // let REVIEWS_ARRAY = [];
  //
  // let url =
  //   "https://api.content.market.yandex.ru/v2/shops/334437/opinions?page=" +
  //   page +
  //   "&count=30";

  // let getReviews = () => {
  //   fetch(url, {
  //     headers: {
  //       Host: "api.content.market.yandex.ru",
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //       Authorization: "6e7e9d0b-9ec4-480b-a5e1-37b3d97d55fc"
  //     }
  //   })
  //     .then(response => response.text())
  //     .then(text => JSON.parse(text))
  //     .then(json => {
  //       if (page < 3) {
  //         console.log(json);
  //         REVIEWS_ARRAY = REVIEWS_ARRAY.concat(json.opinions);
  //         page++;
  //         getReviews();
  //         console.log(REVIEWS_ARRAY);
  //       }
  //     });
  // };
  //
  // getReviews();
});
