import React from "react";
import "./Signup.css";
import { initialCredentialState } from "./signup-utils";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDetails, constants, Password } from "../../imports/imports";

const Signup = () => {
  const [credentials, setCredentials] = useState(initialCredentialState);
  const [accept, setAccept] = useState(false);
  const { signUpUser, userState } = useDetails();
  const navigate = useNavigate();

  useEffect(() => {
    userState.encodedToken && navigate(-1);
  }, [navigate, userState.encodedToken]);

  const onChange = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="signup-page">
      <div className="signup-page-section">
        <div className="signup-image-container">
          <img
            src={constants.imgUrls.new_user}
            alt="signup"
            className="responsive-img"
          />
        </div>
        <form
          className="signup-form"
          onSubmit={async (e) => {
           await signUpUser(e, credentials, accept);
          }}
        >
          <h1 className="flex-and-center gap-1">
            <span>Sign Up</span>{" "}
            <img
              src={constants.imgUrls.avatar}
              alt="avatar"
              className="avatar-img"
            />
          </h1>
          <div className="inputs-container">
            <fieldset>
              <legend>First Name</legend>
              <input
                type="text"
                placeholder="John"
                value={credentials.firstName}
                onChange={onChange}
                name="firstName"
                className="input-box"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <legend>Last Name</legend>
              <input
                type="text"
                placeholder="Doe"
                className="input-box"
                value={credentials.lastName}
                onChange={onChange}
                name="lastName"
                required
              />
            </fieldset>
            <fieldset>
              <legend>Email</legend>
              <input
                type="email"
                placeholder="john@doe.com"
                className="input-box"
                value={credentials.email}
                onChange={onChange}
                required
                name="email"
              />
            </fieldset>
            <fieldset>
              <legend>Password</legend>
              <Password
                title="Password must contain atleast 8 characters, 1 UpperCase, 1 LowerCase and a Special Character"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                fieldValue={credentials.password}
                fieldName={"password"}
                onChange={onChange}
              />
            </fieldset>
            <fieldset>
              <legend>Confirm Password</legend>
              <Password
                fieldValue={credentials.confirmPassword}
                fieldName={"confirmPassword"}
                onChange={onChange}
              />
            </fieldset>
            <section className="accept-terms-container">
              <input
                type="checkbox"
                name="accept-terms"
                id="accept-terms"
                value={accept}
                onChange={(e) => setAccept(e.target.checked)}
              />
              <label htmlFor="accept-terms">
                I accept all Terms &amp; Conditions
              </label>
            </section>
            <button className="log-in-btn flex-and-center gap-sm" type="submit">
              <span>Sign Up</span>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            <p className="flex justify-fs items-center gap-sm existing-user">
              <span>Existing User?</span>{" "}
              <Link className="secondary-link" to={"/login"}>
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
