import React, { Component } from "react";
// import DatePickerWidget from "./DatePickerWidget";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "materialize-css/dist/css/materialize.css";

import Header from "./Header";
import StartScreen from "./StartScreen";
import Dashboard from "./Dashboard";
import Custom from "./Custom";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getReviews();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/custom" component={Custom} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
