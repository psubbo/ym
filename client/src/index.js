import React from "react";
import ReactDOM from "react-dom";
import DatePickerWidget from "./components/DatePicker";

ReactDOM.render(
  <div id="wrapper">
    <h1>Отзывы в Яндекс Маркете</h1>
    <p>Выберите даты:</p>
    <DatePickerWidget />
  </div>,
  document.getElementById("root")
);
