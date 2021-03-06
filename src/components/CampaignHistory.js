import React, { Component } from "react";
import "./CampaignHistory.css";

export default class CampaignHistory extends Component {
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
    console.log(history, "history in renderHistory");
    return (
      <div>
        <div className="history-card">
          {Object.keys(history).map((campaign) => (
            <div
              className={this.props.darkMode === false ? "card" : "card-dark"}
            >
              <p>Message: {history[campaign.toString()]["message"]}</p>
              <p>
                Sent to{" "}
                {Object.keys(history[campaign.toString()]["toDM"]).length}{" "}
                followers.
              </p>
              <p>Created on: {history[campaign.toString()]["createdOn"]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.campaignHistory == null) {
      return (
        <div>
          <p>Loading....</p>
        </div>
      );
    }
    return this.renderHistory();
  }
}
