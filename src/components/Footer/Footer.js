import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="links">
        <h3>Socials</h3>
        <ol className="socials-list">
          <li>
            <a
              href="https://github.com/sharathnair9999"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/Nairified"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sharath99/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
        </ol>
      </div>
      <div className="bottom">
        <p>
          Copyright © 2022 <a href="sharathnair9999.netlify.app">P. Sharath</a>.
          Built with ReactJS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
