import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/campaign">
          <h4 className="child">Campaign</h4>
        </Link>
        <Link to="/tokens">
          <h4 className="child">Tokens</h4>
        </Link>
        <Link to="/">
          <h4 className="child">Home</h4>
        </Link>
      </div>
    );
  }
}
