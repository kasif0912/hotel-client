import { api } from "../apiConfig";

// action for register
export const signup = (userData) => async (dispatch) => {
  try {
    const res = await api.post(`/signup`, userData);
    const user = res.data;
    if (user.token) {
      localStorage.setItem("jwt", user.token);
    }
    console.log("Successfully registered", user.sanitizedUser);
    dispatch({ type: "register Success", payload: user.token });
    return { success: true, message: res.data.message }; // return success response
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return { success: false, message: "This email is already present" };
    } else {
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  }
};
//   // action for login
export const login = (userData) => async (dispatch) => {
  try {
    const res = await api.post(`/login`, userData);
    const user = res.data;
    if (user.token) {
      localStorage.setItem("jwt", user.token);
    }
    console.log("Login successfully", user);
    dispatch({ type: "Login Success", payload: user.token });
    return { success: true, message: user.message }; // return success response
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, message: "User not found with this email" };
    } else {
      return {
        success: false,
        message: "Invalid Password",
      };
    }
  }
};

//   // action for getUser
export const getUser = (jwt) => async (dispatch) => {
  try {
    const response = await api.get(`/getUser`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = await response.data;
    // console.log("get user success", user);
    dispatch({ type: "get user Success", payload: user });
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//   // action for logout
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT", payload: null });
  localStorage.clear();
};
