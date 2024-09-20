import { api } from "../apiConfig";

export const getAllRooms = () => async (dispatch) => {
  try {
    const res = await api.get("/api/getrooms");
    // console.log(res.data.rooms);
    dispatch({ type: "GET_RDATA_SUCCESS", payload: res.data.rooms });
  } catch (error) {
    dispatch({ type: "FAILED_GET_RDATA", payload: error.response });
    console.log("error" + error.message);
  }
};

export const getroomById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/getroomById/${id}`);
    dispatch({ type: "Get individual room success", payload: res.data.room });
  } catch (error) {
    dispatch({
      type: "Failed to get individual room",
      payload: error.response,
    });
  }
};
