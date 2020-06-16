import React, { Component } from "react";

export default class Token extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
    this.handleChange = this.handleChange.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  async setToken() {
    let getToken = await fetch("http://localhost:8000/tokens", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ token: this.state.token }),
    })
      .then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      )
      .then(() => this.getNewData())
      .catch((error) => console.log(error, "error"));
  }

  handleChange(event) {
    this.setState({ token: event.target.value });
  }
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange.bind(this)}
          placeholder="Token"
        ></input>
        <button onClick={this.setToken}>Set Token</button>
      </div>
    );
  }
}
