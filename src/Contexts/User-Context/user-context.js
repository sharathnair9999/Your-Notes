import { createContext, useReducer, useContext } from "react";
import {
  initialUserState,
  userReducer,
  initialAlertState,
} from "./user-reducer";
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

  const value = {
    userState,
    userDispatch,
    showAlert,
    capitalize,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useDetails = () => useContext(UserContext);

export { useDetails, UserProvider };
