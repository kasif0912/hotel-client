import axios from "axios";
export const BASE_URL = "https://hotel-booking-3i3d.onrender.com";

// export const BASE_URL = "http://localhost:4000";
const jwt = localStorage.getItem("jwt");

// deployed server link (render)

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
