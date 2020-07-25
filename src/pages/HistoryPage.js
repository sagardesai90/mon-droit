import React, { Component } from "react";

export default class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignHistory: null,
    };
    this.getHistory = this.getHistory.bind(this);
  }

  async getHistory() {
    let campaigns = await fetch("http://localhost:5000/history", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) =>
        res.json().then((data) => {
          this.setState({ campaignHistory: data });
        })
      )
      .catch((error) => console.log(error, "error"));
  }
  componentDidMount() {
    this.getHistory();
  }

  renderHistory() {
    let history = this.state.campaignHistory;
    return (
      <div>
        {Object.keys(history).map((campaign) => (
          <p>{campaign}</p>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.campaignHistory == null) {
      return <p>Loading....</p>;
    }
    return this.renderHistory();
  }
}
