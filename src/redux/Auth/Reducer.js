const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "register Success":
    case "Login Success":
      return { ...state, isLoading: false, error: null, jwt: action.payload };
    case "get user Success":
      return { ...state, isLoading: false, error: null, user: action.payload };
    case "LOGOUT":
      return { ...initialState };

    default:
      return state;
  }
};
