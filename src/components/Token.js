import React, { Component } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Header from "./Header";
import UserProfile from "./UserProfile";
import "./Token.css";

export default class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: null,
      secretApiKey: null,
      accessToken: null,
      secretAccessToken: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  async setToken() {
    let getToken = await fetch("http://localhost:5000/tokens", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        apiKey: this.state.apiKey,
        secretApiKey: this.state.secretApiKey,
        accessToken: this.state.accessToken,
        secretAccessToken: this.state.secretAccessToken,
      }),
    }).catch((error) => console.log(error, "error"));
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ ...this.state, [event.target.name]: value });
  }

  render() {
    return (
      <div>
        <Logo darkMode={this.props.darkMode} />
        <Header darkMode={this.props.darkMode} />
        <UserProfile />
        <div className="top-level">
          <label className="pure-material-textfield-outlined">
            <input
              name="apiKey"
              onChange={this.handleChange.bind(this)}
              placeholder=" "
            />
            <span>API Key</span>
          </label>
          <label className="pure-material-textfield-outlined">
            <input
              name="secretApiKey"
              onChange={this.handleChange.bind(this)}
              placeholder=" "
            />
            <span>Secret API Key</span>
          </label>
          <label className="pure-material-textfield-outlined">
            <input
              name="accessToken"
              onChange={this.handleChange.bind(this)}
              placeholder=" "
            />
            <span>Access Token</span>
          </label>
          <label className="pure-material-textfield-outlined">
            <input
              name="secretAccessToken"
              onChange={this.handleChange.bind(this)}
              placeholder=" "
            />
            <span>Secret Access Token</span>
          </label>
          <div>
            <Link to="/campaign">
              <button className="btn" onClick={this.setToken}>
                Set Keys
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
