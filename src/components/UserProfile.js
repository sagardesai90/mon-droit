import React, { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.userID = this.userID.bind(this);
  }
  async userID() {
    let sendUser = await fetch("http://localhost:5000/user", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ screenName: this.state.screenName }),
    }).catch((error) => console.log(error, "error"));
  }

  handleChange(event) {
    this.setState({ screenName: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChange.bind(this)}
          placeholder="Username"
        ></input>
        <button onClick={this.userID}>Go</button>
      </div>
    );
  }
}
