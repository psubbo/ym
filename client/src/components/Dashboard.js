import React from "react";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  // averageYtd(arr, startDate, endDate) {
  //   endDate = endDate || Date.now();
  //   startDate = startDate;
  // }
  constructor(props) {
    super(props);
    this.state = {
      averageYtd: 0,
      averageMonth: 0,
      repurchaseYtd: 0,
      repurchaseMonth: 0,
      negativeYtd: 0,
      responseTimeYtd: 0
    };
    this.calculateAverageYtd = this.calculateAverageYtd.bind(this);
    this.calculateAverageMonth = this.calculateAverageMonth.bind(this);
    this.calculateRepurchaseMonth = this.calculateRepurchaseMonth.bind(this);
    this.calculateRepurchaseYtd = this.calculateRepurchaseYtd.bind(this);
    this.calculateNegativeYtd = this.calculateNegativeYtd.bind(this);
    this.calculateResponseTimeYtd = this.calculateResponseTimeYtd.bind(this);
    this.calculateResponseTimeMonth = this.calculateResponseTimeMonth.bind(
      this
    );
  }

  calculateAverageYtd() {
    let yearReviews = JSON.parse(localStorage.getItem("reviews")).filter(el => {
      if (new Date(el.date).getFullYear() === new Date().getFullYear()) {
        return el;
      }
    });

    let sumYtd = yearReviews.reduce((acc, el) => {
      return acc + el.grade;
    }, yearReviews[0].grade);

    this.setState({ averageYtd: (sumYtd / yearReviews.length).toFixed(2) });
  }

  calculateAverageMonth() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let last30DaysReviews = reviews.filter(el => {
      if (new Date(el.date) >= new Date() - 30 * 24 * 60 * 60 * 1000) {
        return el;
      }
    });

    let sum30 = last30DaysReviews.reduce((acc, el) => {
      return acc + el.grade;
    }, last30DaysReviews[0].grade);

    // console.log();
    this.setState({
      averageMonth: (sum30 / last30DaysReviews.length).toFixed(2)
    });
  }

  calculateRepurchaseYtd() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let yearReviews = reviews.filter(el => {
      if (new Date(el.date).getFullYear() === new Date().getFullYear()) {
        return el;
      }
    });
    let repurchase = yearReviews.filter(el => {
      if (el.recommend === true) {
        return el;
      }
    });
    // console.log(repurchase);
    this.setState({
      repurchaseYtd: ((repurchase.length / yearReviews.length) * 100).toFixed(2)
    });
  }

  calculateRepurchaseMonth() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let last30DaysReviews = reviews.filter(el => {
      if (new Date(el.date) >= new Date() - 30 * 24 * 60 * 60 * 1000) {
        return el;
      }
    });
    let repurchase = last30DaysReviews.filter(el => {
      if (el.recommend === true) {
        return el;
      }
    });
    // console.log("repurchase: " + repurchase);
    this.setState({
      repurchaseMonth: (
        (repurchase.length / last30DaysReviews.length) *
        100
      ).toFixed(2)
    });
  }

  calculateNegativeYtd() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let yearReviews = reviews.filter(el => {
      if (new Date(el.date).getFullYear() === new Date().getFullYear()) {
        return el;
      }
    });
    let negative = yearReviews.filter(el => {
      if ((el.grade < 4) & (el.comments.length === 0)) {
        return el;
      }
    });
    // console.log(negative);
    this.setState({
      negativeYtd: negative.length
    });
  }

  calculateResponseTimeYtd() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let yearReviews = reviews.filter(el => {
      if (new Date(el.date).getFullYear() === new Date().getFullYear()) {
        return el;
      }
    });
    let answered = yearReviews.filter(el => {
      if (el.comments.length !== 0) {
        return el;
      }
    });

    const summStart =
      (Date.parse(answered[0].comments[0].answerDate) -
        Date.parse(answered[0].date)) /
      (1000 * 60 * 60);

    let responseTimeYtd = answered.reduce((sum, el) => {
      return (
        sum +
        (Date.parse(el.comments[0].answerDate) - Date.parse(el.date)) /
          (1000 * 60 * 60)
      );
    }, summStart);

    // console.log(responseTimeYtd);

    this.setState({
      responseTimeYtd: (responseTimeYtd / answered.length).toFixed(2)
    });
  }

  calculateResponseTimeMonth() {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    let monthReviews = reviews.filter(el => {
      if (new Date(el.date) >= new Date() - 30 * 24 * 60 * 60 * 1000) {
        return el;
      }
    });
    let answered = monthReviews.filter(el => {
      if (el.comments.length !== 0) {
        return el;
      }
    });

    const summStart =
      (Date.parse(answered[0].comments[0].answerDate) -
        Date.parse(answered[0].date)) /
      (1000 * 60 * 60);

    let responseTimeMonth = answered.reduce((sum, el) => {
      return (
        sum +
        (Date.parse(el.comments[0].answerDate) - Date.parse(el.date)) /
          (1000 * 60 * 60)
      );
    }, summStart);

    // console.log(responseTimeYtd);

    this.setState({
      responseTimeMonth: (responseTimeMonth / answered.length).toFixed(2)
    });
  }

  componentDidMount() {
    // this.props.getReviews();
    this.calculateAverageYtd();
    this.calculateAverageMonth();
    this.calculateRepurchaseYtd();
    this.calculateRepurchaseMonth();
    this.calculateNegativeYtd();
    this.calculateResponseTimeYtd();
    this.calculateResponseTimeMonth();
  }

  render() {
    return (
      <>
        <h4>ОБЗОР:</h4>
        <div className="averageYtd">
          <p>Средний балл:</p>
          <span>YTD -</span>
          <span>{" " + this.state.averageYtd}</span>
        </div>
        <div className="averageMonth">
          <span>30 дней -</span>
          <span>{" " + this.state.averageMonth}</span>
        </div>
        <div className="willRepurchaseYtd">
          <p>Купили бы снова:</p>
          <span>YTD -</span> <span>{" " + this.state.repurchaseYtd + "%"}</span>
        </div>
        <div className="willRepurchaseMonth">
          <span>30 дней -</span>{" "}
          <span>{" " + this.state.repurchaseMonth + "%"}</span>
        </div>
        <div className="answerTimeYtd">
          <p>Срок ответа на негатив:</p>
          <span>YTD -</span>{" "}
          <span>{" " + this.state.responseTimeYtd + " ч."}</span>
        </div>
        <div className="answerTimeMonth">
          <span>30 дней -</span>{" "}
          <span>{" " + this.state.responseTimeMonth + " ч."}</span>
        </div>
        <div className="negativeToAnswerYtd">
          <p>
            <span>Негативных отзывов без ответа:</span>{" "}
            <span>{" " + this.state.negativeYtd}</span>
          </p>
        </div>
      </>
    );
  }
}
function reviewsToProps(state) {
  return {
    auth: state.auth
    // , reviews: state.reviews
  };
}
export default connect(reviewsToProps)(Dashboard);
