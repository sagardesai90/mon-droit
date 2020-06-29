import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Token from "./components/Token";
import UserProfile from "./components/UserProfile";
import TableComponent from "./components/TableComponent";
import Logo from "./components/Logo";
import TextareaAutosize from "react-textarea-autosize";
import HomePage from "./pages/HomePage";
import CampaignPage from "./pages/CampaignPage";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      // <div className="App">
      //   <Logo />
      //   <div className="main">
      //     <div className="forms">
      //       <Token />
      //       <UserProfile />
      //       <TextareaAutosize
      //         minRows={10}
      //         maxRows={10}
      //         defaultValue="Craft your message here."
      //         onChange={this.handleChange.bind(this)}
      //       />
      //     </div>
      //     <div className="table">
      //       <TableComponent message={this.state.message} />
      //     </div>
      //   </div>
      // </div>
      <Router>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route path="/tokens" component={Token} />
          <Route path="/campaign" component={CampaignPage} />
        </div>
      </Router>
    );
  }
}

export default App;
