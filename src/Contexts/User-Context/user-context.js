import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import {
  initialUserState,
  userReducer,
  initialAlertState,
  testUser,
} from "./user-reducer";
import { Navigate } from "react-router-dom";
import { capitalize } from "./user-utils";
const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const showAlert = (type, message, delay) => {
    userDispatch({
      type: "SHOW_ALERT",
      payload: { type: type, message: message, show: true },
    });
    setTimeout(() => {
      userDispatch({ type: "SHOW_ALERT", payload: initialAlertState });
    }, delay);
  };

  const loginUser = async (e, userCredentials) => {
    e.preventDefault();
    try {
      userDispatch({ type: "LOADING", payload: true });
      const { data } = await axios.post("/api/auth/login", userCredentials);
      userDispatch({ type: "LOADING", payload: false });
      const { encodedToken, foundUser } = data;
      const { firstName, lastName } = foundUser;
      showAlert("success", `Hi ${capitalize(firstName)}, Welcome back!`, 2000);
      userDispatch({
        type: "SET_USER",
        payload: { encodedToken, firstName, lastName },
      });
      localStorage.setItem(
        "authToken",
        JSON.stringify({ encodedToken, firstName, lastName })
      );
    } catch (error) {
      userDispatch({ type: "LOADING", payload: false });
      showAlert(
        "error",
        "Could not login user at the moment. Please try later",
        2000
      );
    }
  };
  const signUpUser = async (e, details, accept) => {
    e.preventDefault();
    if (details.password !== details.confirmPassword) {
      showAlert("error", "Password doesn't match", 1500);
      return;
    }
    if (!accept) {
      showAlert("error", "Please Accept the Terms & Conditions.", 1500);
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/signup", details);
      const { createdUser } = data;
      const { firstName } = createdUser;
      showAlert(
        "success",
        `Welcome to Your Notes Family,  ${capitalize(firstName)}`,
        3000
      );
    } catch (error) {
      showAlert("error", `User Profile already exists!`, 3000);
    }
  };

  const logoutUser = () => {
    userDispatch({ type: "LOGOUT" });
    showAlert("success", "You are logged out successfully", 2000);
    localStorage.removeItem("authToken");
  };

  const value = {
    userState,
    userDispatch,
    showAlert,
    capitalize,
    loginUser,
    testUser,
    logoutUser,
    signUpUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const RedirectLoggedUser = ({ children }) => {
  const { userState } = useDetails();
  if (userState.encodedToken) {
    return <Navigate to="/notes" />;
  }
  return children;
};
const RequireAuth = ({ children }) => {
  const { userState } = useDetails();
  if (!userState.encodedToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

const useDetails = () => useContext(UserContext);

export { useDetails, UserProvider, RedirectLoggedUser, RequireAuth };
