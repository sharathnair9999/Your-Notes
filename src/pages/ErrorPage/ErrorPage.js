import React from "react";
import { Link } from "react-router-dom";
import { constants } from "../../app-utils/constants";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page-section">
      <h1>Page Not Found</h1>
      <Link className="btn btn-primary" to={"/notes"}>
        Go To Home
      </Link>
      <div className="error-img-container">
        <img
          src={constants.imgUrls.error_404}
          alt="error  4040 page"
          className="responsive-img"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
