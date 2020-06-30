import React, { Component } from "react";
import Logo from "../components/Logo";
import TableComponent from "../components/TableComponent";
import Header from "../components/Header";

export default class CampaignPage extends Component {
  render() {
    return (
      <div>
        <Header darkMode={this.props.darkMode} />
        <Logo darkMode={this.props.darkMode} />
        <TableComponent darkMode={this.props.darkMode} />
      </div>
    );
  }
}
