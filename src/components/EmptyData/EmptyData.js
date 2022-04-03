import React from "react";
import "./EmptyData.css";
import { constants } from "../../app-utils/constants";

const EmptyData = ({ message, imgUrl }) => {
  return (
    <div className="empty-data-section">
      <img
        src={imgUrl || constants.imgUrls.empty_data_svg}
        alt="Error Illustration"
      />
      <h3>{message}</h3>
    </div>
  );
};

export default EmptyData;
