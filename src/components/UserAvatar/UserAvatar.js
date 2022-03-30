import React from "react";
import { useDetails } from "../../imports/imports";
import "./UserAvatar.css";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const navigate = useNavigate();
  const { userState, logoutUser } = useDetails();
  const firstInitial =
    userState?.firstName && userState.firstName[0].toUpperCase();
  const lastInitial =
    userState?.lastName && userState.lastName[0].toUpperCase();
  return (
    <div
      className={`user-avatar ${
        userState.encodedToken ? "show-avatar" : "hide-avatar"
      } `}
    >
      {userState.encodedToken && (
        <span
          onClick={() => {
            setTimeout(() => {
              logoutUser();
              navigate("/login");
            }, 500);
          }}
          className="user-avatar-container"
        >
          <span>
            <i className="avatar-icon fa-solid fa-user fa-2xl"></i>
          </span>
          <span className="name flex-and-center">
            <span>{firstInitial}</span>
            <span>{lastInitial}</span>
          </span>
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
