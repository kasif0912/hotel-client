import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import { login } from "../redux/Auth/Action";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 

  // console.log(formData);
  const adddata = (e) => {
    const { name, value } = e.target;
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Check if any field is empty
    if (!email || !password) {
      toast.warn("Please fill in all fields.", {
        position: "top-center",
      });
      return;
    }

    const response = await dispatch(login(formData));
    console.log(response);
    if (response.success) {
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
      });
      toast.success(response.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => {
          navigate("/home"); // Navigate to /home after toast closes
        },
      });
    } else {
      toast.error(response.message, {
        position: "top-center",
      });
    }
    // try {
    //   const res = await api.post("/login", formData);
    //   const user = res.data;
    //   // if (user.token) {
    //   //   localStorage.setItem("jwt", user.token);
    //   // }
    //   localStorage.setItem("currentUser", JSON.stringify(user.loggedInUser));
    //   console.log(user);

    //   if (res.status === 200) {
    //     toast.success(user.message, {
    //       position: "top-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       onClose: () => {
    //         navigate("/home"); // Navigate to /homescreen after toast closes
    //       },
    //     });
    //     setFormData({
    //       email: "",
    //       password: "",
    //     });
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     toast.error("User not found with this email", {
    //       position: "top-center",
    //     });
    //     // Handle error - show error message to the user
    //   } else if (error.response && error.response.status === 404) {
    //     toast.error("Invalid Password", {
    //       position: "top-center",
    //     });
    //   } else {
    //     console.log("Can't login right now. Try later");
    //   }
    // }
  };
  return (
    <div className="sign_container">
      <div className="sign_form">
        <form onSubmit={handleSubmit}>
          <h1 className="heading">Login</h1>
          <hr />

          <div className="form_data">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              onChange={adddata}
              value={formData.email}
              name="email"
              id="email"
            />
          </div>

          <div className="form_data">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={adddata}
              value={formData.password}
              id="password"
            />
          </div>
          <button type="submit" className="signin_btn ">
            Continue
          </button>
          <hr />

          <div className="signin_info">
            <p>Don't have an account?</p>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
