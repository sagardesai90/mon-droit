import React, { Component } from "react";
import Logo from "../components/Logo";
import VirtualizedTable from "../components/VirtualizedTable";

export default class TablePage extends Component {
  render() {
    return (
      <div>
        <Logo darkMode={this.props.darkMode} />
        <VirtualizedTable />
      </div>
    );
  }
}
