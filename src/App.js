import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Token from "./components/Token";
import HomePage from "./pages/HomePage";
import Campaign2Page from "./pages/Campaign2Page";
import HistoryPage from "./pages/HistoryPage";
import Toggle from "./components/Toggle";
import TablePage from "./pages/TablePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null, darkMode: false };
    this.handleChange = this.handleChange.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  setMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Toggle setMode={this.setMode} darkMode={this.state.darkMode} />
          <Route
            exact
            path="/"
            component={() => <HomePage darkMode={this.state.darkMode} />}
          />
          <Route
            path="/tokens"
            component={() => <Token darkMode={this.state.darkMode} />}
          />
          <Route
            path="/campaign2"
            component={() => <Campaign2Page darkMode={this.state.darkMode} />}
          />
          <Route
            path="/campaign"
            component={() => <TablePage darkMode={this.state.darkMode} />}
          />
          <Route
            path="/history"
            component={() => <HistoryPage darkMode={this.state.darkMode} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
