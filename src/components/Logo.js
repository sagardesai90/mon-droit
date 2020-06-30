import React, { Component } from "react";
import "./Logo.css";
import LogoImg from "./sword.png";
import LogoDark from "./sword-2.png";
export default class Logo extends Component {
  render() {
    return (
      <div
        className={this.props.darkMode === false ? "glitch" : "glitch-dark"}
        title="mon-droit"
      >
        <img
          className="logo"
          src={this.props.darkMode === false ? LogoImg : LogoDark}
        />
        <div>Mon Droit</div>
      </div>
    );
  }
}
