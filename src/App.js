import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Token from "./components/Token";
import UserProfile from "./components/UserProfile";
import TableComponent from "./components/TableComponent";

function App() {
  return (
    <div className="App">
      <UserProfile />
      <Token />
      <TableComponent />
    </div>
  );
}

export default App;
