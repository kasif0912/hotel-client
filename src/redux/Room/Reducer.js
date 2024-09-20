// Define initial state for the products
const initialState = {
  rooms: [],
  room: {},
  error: null,
};

// Define your reducer function
export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RDATA_SUCCESS":
      return {
        ...state,
        rooms: action.payload,
        error: null,
      };
    case "FAILED_GET_RDATA":
      return {
        ...state,
        error: action.payload,
      };
    case "Get individual room success":
      return {
        ...state,
        room: action.payload,
        error: null,
      };
    case "Failed to get individual room":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
