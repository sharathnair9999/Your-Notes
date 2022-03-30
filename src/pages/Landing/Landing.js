import React from "react";
import { constants } from "../../imports/imports";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-section">
        <div className="landing-hero-section flex flex-col">
          <h1 className="site-name">
            <span className="site-name-1">Your </span>
            <span className="site-name-2">Notes</span>
          </h1>
          <p className="hero-text">
            Plan all your activites, take down notes, share it with ease from
            anywhere
          </p>
          <div className="join-section flex justify-fs items-fs flex-col gap-2">
            <span>
              <Link to={"/signup"} className="join-now">
                Join Now
              </Link>
            </span>
            <span className="flex-and-center gap-1">
              <span>Already Have an Account?</span>
              <Link to={"/login"} className="secondary-link">
                Sign In
              </Link>
            </span>
          </div>
        </div>
        <div className="landing-img">
          <img
            src={constants.imgUrls.landing_bg}
            alt="notes-bg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
