import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

class Custom extends React.Component {
  averageYtd(arr, startDate, endDate) {
    endDate = endDate || Date.now();
    startDate = startDate;
  }

  render() {
    console.log(this.props);
    return (
      <>
        <h3>Общая информация:</h3>
        <div className="averageYtd">
          <p>Средний балл (YTD):</p> <span />
        </div>
        <div className="averageMonth">
          <p>Средний балл (последние 30 дней):</p> <span />
        </div>
        <div className="negativeToAnswerYtd">
          <p>Негативных отзывов без ответа (YTD):</p> <span />
        </div>
        <div className="willRepurchaseYtd">
          <p>Купили бы снова (YTD):</p> <span />
        </div>
        <div className="willRepurchaseMonth">
          <p>Купили бы снова (последние 30 дней):</p> <span />
        </div>
        <div className="answerTimeYtd">
          <p>Срок ответа на негатив (YTD):</p> <span />
        </div>
        <div className="answerTimeMonth">
          <p>Срок ответа на негатив (предыдущие 30 дней):</p> <span />
        </div>
      </>
    );
  }
}
function reviewsToProps(state) {
  return { reviews: state.reviews };
}
export default connect(reviewsToProps)(Custom);
