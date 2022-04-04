import { userToken } from "./user-utils";

const userData = userToken();
const initialAlertState = {
  type: null,
  message: null,
  show: false,
};
const initialUserState = {
  encodedToken: userData ? userData.encodedToken : null,
  firstName: userData ? userData.firstName : null,
  lastName: userData ? userData.lastName : null,
  alert: initialAlertState,
  loading: false,
};

const testUser = {
  email: "adarshbalika@gmail.com",
  password: "adarshBalika123",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        encodedToken: payload.encodedToken,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
    case "LOGOUT":
      return { ...state, encodedToken: null, firstName: null, lastName: null };
    case "SIGNUP":
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
      };
    case "SHOW_ALERT":
      return {
        ...state,
        alert: payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export { testUser, initialUserState, userReducer, initialAlertState };
