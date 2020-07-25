import React, { Component } from "react";
import Logo from "../components/Logo";
import "./HistoryPage.css";

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
    console.log(history, "history in renderHistory");
    return (
      <div>
        <Logo darkMode={this.props.darkMode} />
        <div className="history-card">
          {Object.keys(history).map((campaign) => (
            <div>
              <p>{history[campaign.toString()]["createdOn"]}</p>
              <p>{history[campaign.toString()]["message"]}</p>
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
          <Logo darkMode={this.props.darkMode} />
          <p>Loading....</p>
        </div>
      );
    }
    return this.renderHistory();
  }
}
