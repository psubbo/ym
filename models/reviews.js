const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  id: String,
  grade: Number,
  date: Date,
  recommend: Boolean,
  problem: String,
  delivery: String,
  shopOrderId: String,
  text: String,
  comments: [{ answerDate: Date, answerText: String }]
});

mongoose.model("reviews", reviewSchema);
