import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { roomReducer } from "./Room/Reducer";
import { authReducer } from "./Auth/Reducer";
import { roomBookingReducer } from "./roomBooking/Reducer";

const rootReducers = combineReducers({
  roomData: roomReducer,
  auth: authReducer,
  roomBooking: roomBookingReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
