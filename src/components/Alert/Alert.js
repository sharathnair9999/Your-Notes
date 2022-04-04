import React from "react";
import { useDetails } from "../../Contexts/User-Context/user-context";
import "./Alert.css";

const Alert = () => {
  const { userState } = useDetails();
  const { type, message } = userState.alert;
  return (
    <div
      className={`alert-box ${type} ${message ? "show-alert" : "hide-alert"}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Alert;
