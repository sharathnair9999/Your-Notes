const userData = JSON.parse(localStorage.getItem("authToken"));
const initialUserState = {
  encodedToken: userData ? userData.encodedToken : null,
  firstName: userData ? userData.firstName : null,
  lastName: userData ? userData.lastName : null,
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
      return { encodedToken: null, firstName: null, lastName: null };
    case "SIGNUP":
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
      };
    default:
      return state;
  }
};

export { testUser, initialUserState, userReducer };
