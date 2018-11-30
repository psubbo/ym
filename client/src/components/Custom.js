import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

class Custom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date() - 7 * 24 * 60 * 60 * 1000,
      endDate: new Date(),
      average: 0,
      repurchase: 0,
      negative: 0,
      responseTime: 0
    };
    this.calculateAverage = this.calculateAverage.bind(this);
    this.calculateRepurchase = this.calculateRepurchase.bind(this);
    this.calculateNegative = this.calculateNegative.bind(this);
    this.calculateResponseTime = this.calculateResponseTime.bind(this);

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.getCurrentRangeReviews = this.getCurrentRangeReviews.bind(this);
  }

  getCurrentRangeReviews(dateStart, dateEnd) {
    const allReviews = JSON.parse(localStorage.getItem("reviews"));
    let currentReviews = allReviews.filter(el => {
      if (
        (new Date(el.date) >= new Date(dateStart)) &
        (new Date(el.date) <= new Date(dateEnd))
      ) {
        return el;
      }
    });
    localStorage.setItem("currentReviews", JSON.stringify(currentReviews));
  }

  calculateAverage() {
    let currentReviews = JSON.parse(localStorage.getItem("currentReviews"));

    let sumYtd = currentReviews.reduce((acc, el) => {
      return acc + el.grade;
    }, currentReviews[0].grade);

    this.setState({ average: (sumYtd / currentReviews.length).toFixed(2) });
  }

  calculateRepurchase() {
    let currentReviews = JSON.parse(localStorage.getItem("currentReviews"));

    let repurchase = currentReviews.filter(el => {
      if (el.recommend === true) {
        return el;
      }
    });
    // console.log("repurchase: " + repurchase);
    this.setState({
      repurchase: ((repurchase.length / currentReviews.length) * 100).toFixed(2)
    });
  }

  calculateNegative() {
    let currentReviews = JSON.parse(localStorage.getItem("currentReviews"));

    let negative = currentReviews.filter(el => {
      if ((el.grade < 4) & (el.comments.length === 0)) {
        return el;
      }
    });
    // console.log(negative);
    this.setState({
      negative: negative.length
    });
  }

  calculateResponseTime() {
    let currentReviews = JSON.parse(localStorage.getItem("currentReviews"));

    let answered = currentReviews.filter(el => {
      if (el.comments.length !== 0) {
        return el;
      }
    });

    const summStart =
      (Date.parse(answered[0].comments[0].answerDate) -
        Date.parse(answered[0].date)) /
      (1000 * 60 * 60);

    let responseTime = answered.reduce((sum, el) => {
      return (
        sum +
        (Date.parse(el.comments[0].answerDate) - Date.parse(el.date)) /
          (1000 * 60 * 60)
      );
    }, summStart);

    // console.log(responseTimeYtd);

    this.setState({
      responseTime: (responseTime / answered.length).toFixed(2)
    });
  }

  handleChangeStart(date) {
    // console.log(date);

    this.setState({
      startDate: date
    });

    this.getCurrentRangeReviews(date, this.state.endDate);
    this.calculateAverage();
    this.calculateRepurchase();
    this.calculateNegative();
    this.calculateResponseTime();
  }

  handleChangeEnd(date) {
    // console.log(date);
    this.setState({
      endDate: date
    });
    this.getCurrentRangeReviews(this.state.startDate, date);
    this.calculateAverage();
    this.calculateRepurchase();
    this.calculateNegative();
    this.calculateResponseTime();
  }

  componentDidMount() {
    this.getCurrentRangeReviews(this.state.startDate, this.state.endDate);
    this.calculateAverage();
    this.calculateRepurchase();
    this.calculateNegative();
    this.calculateResponseTime();
  }

  render() {
    // console.log(this.props);
    return (
      <div style={{ display: "block" }}>
        <h4>ЗА ПЕРИОД:</h4>
        <div>
          <span>От: </span>
          <DatePicker
            selected={this.state.startDate}
            dateFormat="dd/MM/yyyy"
            className="dateInput"
            maxDate={this.state.endDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />
        </div>
        <div>
          <span>До: </span>
          <DatePicker
            todayButton={"Сегодня"}
            selected={this.state.endDate}
            selectsEnd
            dateFormat="dd/MM/yyyy"
            className="dateInput"
            minDate={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
        <br />
        <div className="average">
          <span>Средний балл:</span>
          <span>{" " + this.state.average}</span>
        </div>
        <div className="willRepurchase">
          <span>Купили бы снова:</span>
          <span>{" " + this.state.repurchase + "%"}</span>
        </div>
        <div className="answerTime">
          <span>Средний срок ответа на негатив:</span>
          <span>{" " + this.state.responseTime}</span>
        </div>
        <div className="negativeToAnswer">
          <span>Негативных отзывов без ответа:</span>
          <span>{" " + this.state.negative}</span>
        </div>
      </div>
    );
  }
}

function reviewsToProps(state) {
  return {
    auth: state.auth
    // , reviews: state.reviews
  };
}
export default connect(reviewsToProps)(Custom);
