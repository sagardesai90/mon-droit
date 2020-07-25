import React, { Component } from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import VirtualizedTable from "../components/VirtualizedTable";

export default class TablePage extends Component {
  render() {
    return (
      <div>
        <Header darkMode={this.props.darkMode} />
        <Logo darkMode={this.props.darkMode} />
        <VirtualizedTable />
      </div>
    );
  }
}
