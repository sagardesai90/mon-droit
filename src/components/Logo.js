import React, { Component } from "react";
import "./Logo.css";
import LogoImg from "./sword.png";
export default class Logo extends Component {
  render() {
    return (
      <div className="glitch" title="mon-droit">
        <img className="logo" src={LogoImg} />
        <div>Mon Droit</div>
      </div>
    );
  }
}
