import { api } from "../apiConfig";

export const roomBooking = (bookingDetails) => async (dispatch) => {
  try {
    const res = await api.post("/api/roomBook", bookingDetails);
    dispatch({ type: "roomBook_Success", payload: res.data });
  } catch (error) {
    dispatch({ type: "roomBook_Failed", payload: error.response });
    console.log("error" + error.message);
  }
};

export const getBookingByUserId = ({ userId }) => async (dispatch) => {
  try {
    const res = await api.post("/api/getBookingByUserId/", { userId });
    dispatch({ type: "getBookingByUserId", payload: res.data });
  } catch (error) {
    dispatch({ type: "getBookingsByUserId_Failed", payload: error.response });
    console.log("error" + error.message);
  }
};

export const cancelBooking = ({ bookingid, roomid }) => async (dispatch) => {
  try {
    const res = await api.post("/api/cancelbooking", { bookingid, roomid });
    dispatch({ type: "cancel_Success", payload: res.data });
  } catch (error) {
    dispatch({ type: "cancel_Failed", payload: error.response });
    console.log("error" + error.message);
  }
};
