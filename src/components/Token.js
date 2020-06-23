import React, { Component } from "react";

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
        <input
          name="apiKey"
          onChange={this.handleChange.bind(this)}
          placeholder="API Key"
        ></input>
        <input
          name="secretApiKey"
          onChange={this.handleChange.bind(this)}
          placeholder="Secret API Key"
        ></input>
        <input
          name="accessToken"
          onChange={this.handleChange.bind(this)}
          placeholder="Access Token"
        ></input>
        <input
          name="secretAccessToken"
          onChange={this.handleChange.bind(this)}
          placeholder="Secret Access Token"
        ></input>
        <button onClick={this.setToken}>API Key</button>
      </div>
    );
  }
}
