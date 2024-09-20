import React from "react";
import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const navigate = useNavigate();

  const enter = () => {
    navigate("/home");
  };
  return (
    <div className="landing">
      <div className="">
        <h2>The Chic Nook</h2>
        <h1>"Where Every Stay is a Story"</h1>
        <button onClick={enter}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingScreen;
