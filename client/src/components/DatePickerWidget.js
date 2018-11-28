import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DatePickerWidget extends React.Component {
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
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div>
        <p>От:</p>
        <DatePicker
          selected={this.state.startDate}
          dateFormat="dd/MM/yyyy"
          className="dateInput"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        <p>До:</p>
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
    );
  }
}

export default DatePickerWidget;
