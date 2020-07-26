import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/history">
          <h4
            className={this.props.darkMode === false ? "child" : "child-dark"}
          >
            History
          </h4>
        </Link>

        <Link to="/campaign">
          <h4
            className={this.props.darkMode === false ? "child" : "child-dark"}
          >
            Campaign
          </h4>
        </Link>
        <Link to="/tokens">
          <h4
            className={this.props.darkMode === false ? "child" : "child-dark"}
          >
            Tokens
          </h4>
        </Link>
        <Link to="/">
          <h4
            className={this.props.darkMode === false ? "child" : "child-dark"}
          >
            Home
          </h4>
        </Link>
      </div>
    );
  }
}
