import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">
              <i className="material-icons right">person</i>Войти
            </a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <a href="/dashboard">Обзор</a>
            </li>
            <li>
              <a href="/custom">Детали</a>
            </li>
            <li>
              <a href="/api/logout">Выйти</a>
            </li>
          </>
        );
    }
  }

  render() {
    // console.log(this.props);
    return (
      <nav>
        <div
          style={{ paddingLeft: "15px", backgroundColor: "#0082c3" }}
          className="nav-wrapper"
        >
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="left brand-logo"
          >
            YM
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
