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
        <Logo darkMode={this.props.darkMode} />
        <Header darkMode={this.props.darkMode} />
        <div
          className={
            this.props.darkMode === false ? "home-text" : "home-text-dark"
          }
        >
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
          <div
            className={
              this.props.darkMode === false ? "buttonDiv" : "buttonDiv-dark"
            }
          >
            <Link to="/tokens">
              <button
                className={
                  this.props.darkMode === false ? "letsGo" : "letsGo-dark"
                }
              >
                Let's go
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
