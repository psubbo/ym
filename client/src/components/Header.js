import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            YM
          </a>
          <ul className="right">
            <li>
              <a href="">Детали</a>
            </li>
            <li>
              <a href="">
                <i className="material-icons right">person</i>Войти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
