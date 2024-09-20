import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import BookingScreen from "./pages/BookingScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./components/Success";
import ProfileScreen from "./pages/ProfileScreen";
import AdminScreen from "./pages/AdminScreen";
import LandingScreen from "./pages/LandingScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingScreen />} />
        <Route exact path="/home" element={<HomeScreen />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/book/:id/:fromDate/:toDate" element={<BookingScreen />} />
        <Route exact path="/success" element={<Success />} />
        <Route exact path="/profilescreen" element={<ProfileScreen />} />
        <Route exact path="/admin" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
