import React from "react";
import { constants } from "../../imports/imports";
import "./NotesLanding.css";

const NotesLanding = () => {
  return (
    <div className="flex-and-center w-100 notes-landing-section flex-col">
      <div className="img-container">
        <img
          className="responsive-img"
          height={"300px"}
          width={"300px"}
          src={constants.imgUrls.notes_landing}
          alt="notes landing illustration"
        />
      </div>
      <p className="notes-landing-text">
        Choose among the options of <span className="highlight">Your Note</span>{" "}
        from the panel
      </p>
    </div>
  );
};

export default NotesLanding;
