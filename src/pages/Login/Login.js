import React from "react";
import "./Login.css";
import { constants } from "../../constants";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page-section">
        <div className="login-image-container">
          <img
            src={constants.imgUrls.login_svg}
            alt="login"
            className="responsive-img"
          />
        </div>
        <form className="login-form">
          <h1 className="flex-and-center gap-1">
            <span>Login</span>
            <img
              src={constants.imgUrls.avatar}
              alt="avatar"
              className="avatar-img"
            />
          </h1>
          <div className="inputs-container">
            <fieldset>
              <legend>Email</legend>
              <input
                type="text"
                placeholder="john@doe.com"
                className="input-box"
              />
            </fieldset>
            <fieldset>
              <legend>Password</legend>
              <input
                type="password"
                placeholder="*******"
                className="input-box"
              />
            </fieldset>
            <section className="remember-me my-1">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </section>
            <button className="log-in-btn flex-and-center gap-sm mb-1">
              <span>Log In</span>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            <p className="flex justify-fs items-center gap-sm my-1">
              <span>Forgot Password?</span>{" "}
              <Link className="secondary-link" to={"/reset-password"}>
                Reset Here
              </Link>
            </p>
            <p className="flex justify-fs items-center gap-sm">
              <span>New User?</span>{" "}
              <Link className="secondary-link" to={"/signup"}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
