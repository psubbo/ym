import React, { Component } from "react";
// import DatePickerWidget from "./DatePickerWidget";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "materialize-css/dist/css/materialize.css";

import Header from "./Header";
import StartScreen from "./StartScreen";
const Dashboard = () => <h2>Dashboard</h2>;
const Custom = () => <h2>Custom</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
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
