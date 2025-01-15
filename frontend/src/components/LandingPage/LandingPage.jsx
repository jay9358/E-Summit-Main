// LandingPage.jsx
import React from "react";
import "./page.css";
import logo from "../images/logo.png";
import navbar from "../images/navbar.png";
import withCursor from "../Cursor/Cursor"; // Import the HOC
import Countdown from "./Countdown/Countdown";
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div id="Page_container">
          <div className="rectangle"></div>

          <div className="logo_container">
            <img
              className="logo logoc"
              src="https://res.cloudinary.com/dqcrzyxnt/image/upload/q_auto/f_auto/v1704745245/esummit/logo_md7cvo.png"
            ></img>
          </div>
          <h1 className="text-element">
            <span className="text_s">E-SUMMIT</span>
          </h1>

          <div className="count">
            <Countdown />
          </div>

          {/* Register Button */}
          <Link to="/register" className="register-button-container">
            <button className="register-button">
              <p>REGISTER NOW</p>
              <div id="clip">
                <div id="leftTop" className="corner"></div>
                <div id="rightBottom" className="corner"></div>
                <div id="rightTop" className="corner"></div>
                <div id="leftBottom" className="corner"></div>
              </div>
              <span id="rightArrow" className="arrow"></span>
              <span id="leftArrow" className="arrow"></span>
            </button>
          </Link>

          <div className="design_container"></div>
          <div className="cursor"></div>
        </div>
      </>
    );
  }
}

export default withCursor(LandingPage); // Wrap the component with the HOC
