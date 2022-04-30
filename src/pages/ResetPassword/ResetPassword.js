import React from "react";
import { Link } from "react-router-dom";
import { constants } from "../../imports/imports";
import "./ResetPassword.css";

const ResetPassword = () => {
  return (
    <div className="reset-page-container">
      <div className="login-image-container">
        <img
          src={constants.imgUrls.login_svg}
          alt="login"
          className="responsive-img"
        />
      </div>
      <form className="login-form my-auto" onSubmit={(e) => e.preventDefault()}>
        <h2 className="flex-and-center gap-1">
          <span>Reset Password</span>
          <img
            src={constants.imgUrls.avatar}
            alt="avatar"
            className="avatar-img"
          />
        </h2>
        <div className="inputs-container">
          <fieldset>
            <legend>Registered Email</legend>
            <input
              type="email"
              placeholder="john@doe.com"
              className="input-box"
              required
              autoFocus
              name="email"
            />
          </fieldset>
          <button className="log-in-btn flex-and-center gap-sm mb-1">
            <span>Send OTP</span>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>

          <p className="flex justify-fs items-center gap-sm my-1">
            <span>Remember who you are?</span>{" "}
            <Link className="secondary-link" to={"/login"}>
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
