import React, { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/userotp.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    //  localStorage se users lo
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //  username aur password dono match karo
    const matchedUser = users.find(
      (x) =>
        x.username?.toLowerCase() === form.username.toLowerCase() &&
        x.password === form.password
    );

    if (!matchedUser) {
      alert("Invalid Username or Password ");
      return;
    }

    // OTP generate karo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    localStorage.setItem("otp", otp);

    alert("Your OTP is: " + otp);

    navigate("/otp");
  }

  return (
    <div className="main-container">
      <div className="login-card">

        {/* Left Side */}
        <div className="left-panel">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="illustration"
          />
        </div>

        {/* Right Side */}
        <div className="right-panel">
          <h2 className="title">Aryan Group</h2>
          <p className="subtitle">Login</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label><i className="fa-solid fa-user" style={{ color: "black" }}></i>User Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label><i className="fa-solid fa-lock" style={{ color: "black" }}></i>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <p className="forgot ms-4">
              <Link to="/forgot-password">Forgot your Password?</Link>
            </p>


            <div className="btn-group">
              <button type="submit" className="login-btn">
                Login
              </button>

            </div>
            <div className="create">
              <p className="forgot d-flex fs-6 mt-4 ms-5"><Link to="/signup" >Create Your Account?</Link></p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}