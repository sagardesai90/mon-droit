import React, { Component } from "react";
import Token from "../components/Token";
import Logo from "../components/Logo";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Header />
        <div className="home-text">
          <p>Need to mass DM your Twitter followers?</p>
          <p>Mon Droit lets you do that.</p>
          <p>Ask them to follow you on</p>
          <Typewriter
            className="homepage"
            options={{
              strings: [
                "Substack",
                "Patreon",
                "Parler",
                "Youtube",
                "Instagram",
                "Ghost",
                "Locals",
              ],
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {}}
          />
          <p>and make the most of your hard earned Twitter presence.</p>
          <div className="buttonDiv">
            <Link to="/tokens">
              <button className="home-btn letsGo">Let's go</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
