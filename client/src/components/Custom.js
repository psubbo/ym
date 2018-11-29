import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

class Custom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    console.log(date);
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    console.log(date);
    this.setState({
      endDate: date
    });
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ display: "flex" }}>
        <div>
          <span>От: </span>
          <DatePicker
            selected={this.state.startDate}
            dateFormat="dd/MM/yyyy"
            className="dateInput"
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
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}

function reviewsToProps(state) {
  return { reviews: state.reviews };
}
export default connect(reviewsToProps)(Custom);
