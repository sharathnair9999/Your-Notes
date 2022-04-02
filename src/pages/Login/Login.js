import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Password, useDetails, constants } from "../../imports/imports";
import { initialCredentialState } from "../Signup/signup-utils";

const Login = () => {
  const [credentials, setCredentials] = useState(initialCredentialState);

  const { loginUser, testUser } = useDetails();

  const onChange = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e, details) => {
     loginUser(e, details);
  };

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
        <form
          className="login-form"
          onSubmit={(e) => handleLogin(e, credentials)}
        >
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
                type="email"
                placeholder="john@doe.com"
                className="input-box"
                required
                autoFocus
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </fieldset>
            <fieldset>
              <legend>Password</legend>
              <Password
                fieldName={"password"}
                fieldValue={credentials.password}
                onChange={onChange}
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
            <button
              className="log-in-btn flex-and-center gap-sm mb-1"
              onClick={(e) => {
                loginUser(e, testUser);
                setTimeout(() => {
                  setCredentials(testUser);
                }, 500);
              }}
            >
              <span>Log as Test User</span>
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
