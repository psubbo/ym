const passport = require("passport");

const mongoose = require("mongoose");
const keys = require("../config/keys");
require("../models/reviews");

const Review = mongoose.model("reviews");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

module.exports = app => {
  app.get("/api/get_reviews", async (req, res) => {
    const reviews = await Review.find({ date: { $lte: Date.now() } });
    res.send({ reviews });
  });
};
