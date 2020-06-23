import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Token from "./components/Token";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <UserProfile />
      <Token />
    </div>
  );
}

export default App;
