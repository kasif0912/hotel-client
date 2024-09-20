const initialState = {
  bookingDetails: {},
  error: null,
  bookings: [],
};

export const roomBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "roomBook_Success":
      return {
        ...state,
        bookingDetails: action.payload,
        error: null,
      };
    case "roomBook_Failed":
      return {
        ...state,
        error: action.payload,
      };
    case "getBookingByUserId":
      return {
        ...state,
        bookings: action.payload,
      };
    case "getBookingsByUserId_Failed":
      return {
        ...state,
        error: action.payload,
      };
    case "cancel_Success":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload.bookingid
            ? { ...booking, status: "CANCELLED" }
            : booking
        ),
      };
    case "cancel_Failed":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
