import React, { Component } from "react";
import Logo from "../components/Logo";
import CampaignHistory from "../components/CampaignHistory";
import Header from "../components/Header";

export default class HistoryPage extends Component {
  render() {
    return (
      <div>
        <Header darkMode={this.props.darkMode} />
        <Logo darkMode={this.props.darkMode} />
        <CampaignHistory darkMode={this.props.darkMode} />
      </div>
    );
  }
}
