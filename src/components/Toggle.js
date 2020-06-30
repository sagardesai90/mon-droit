import React, { Component } from "react";
import "./Toggle.scss";

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { darkMode: props.darkMode };
    this.clicked = this.clicked.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.darkMode != this.props.darkMode) {
      this.setState({ darkMode: this.props.darkMode });
    }
  }

  clicked = () => {
    // this.setState({ darkMode: !this.state.darkMode });
    if (this.state.darkMode == true) {
      document.body.style.backgroundColor = "#fff";
    } else {
      document.body.style.backgroundColor = "#15202B";
    }
  };

  render() {
    return (
      <div class="toggleWrapper">
        <input type="checkbox" className="dn" id="dn" />
        <label
          for="dn"
          className="toggle"
          onClick={() => {
            this.props.setMode();
            this.clicked();
          }}
        >
          <span
            className="toggle__handler"
            onClick={() => {
              this.props.setMode();
              this.clicked();
            }}
          >
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    );
  }
}
