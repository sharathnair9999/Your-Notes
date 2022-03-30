import { createContext, useReducer, useContext, useState } from "react";
import { initialUserState, userReducer } from "./user-reducer";
import { capitalize } from "./user-utils";
const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert  = (type, message, delay) => {
    setAlert({type:type, message:message})
    setTimeout(() => {
      setAlert({type:"", message:""})
    }, delay);
  }

  const value = { userState, userDispatch, alert, setAlert, showAlert, capitalize };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useDetails = () => useContext(UserContext);

export { useDetails, UserProvider };
