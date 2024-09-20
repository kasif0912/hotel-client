import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import { getUser, logout } from "../redux/Auth/Action";

const Navbar = () => {
  const token = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="/home">
        The Chic Nook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i class="fa-solid fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {auth.user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ fontWeight: "600" }}
                  >
                    {auth.user?.fullName.toUpperCase()}
                  </button>
                  <div
                    class="dropdown-menu"
                    style={{
                      marginLeft: "-40px",
                      marginTop: "10px",
                      backgroundColor: "#1ea473",
                    }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item"
                      style={{ color: "#fff" }}
                      href="/profilescreen"
                    >
                      Profile
                    </a>
                    <a
                      class="dropdown-item"
                      style={{ color: "#fff" }}
                      href="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <NavLink to="/signup">
                    <span className="nav-link">Register</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login">
                    <span className="nav-link">Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {auth.user && (
            <Avatar style={{ backgroundColor: "white", color: "#1ea473" }}>
              {auth.user.fullName?.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
