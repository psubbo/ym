import React, { Component } from "react";
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
              <a href="">Детали</a>
            </li>
            <li>
              <a href="/api/logout">Выйти</a>
            </li>
          </>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            YM
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect()(Header);
