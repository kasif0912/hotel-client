import React, { useEffect } from "react";
import { Tabs } from "antd";
import { getUser } from "../redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Bookings from "../components/Bookings";
const { TabPane } = Tabs;

const token = localStorage.getItem("jwt");
const ProfileScreen = () => {
  const auth = useSelector((store) => store.auth);
  console.log(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [ dispatch]);
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });
  return (
    <div className="ml-4 mt-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name : {auth.user?.fullName}</h1>
          <h1>Email : {auth.user?.email}</h1>
          <h1>Admin : {auth.user?.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Bookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
