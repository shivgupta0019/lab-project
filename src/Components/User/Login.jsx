
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/userotp.css";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: "", general: "" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true // 
        }
      );

      //  CASE 1: OTP REQUIRED
      if (res.data.otpRequired) {
        localStorage.setItem("email", form.email);
        navigate("/otp");
      }

      //  CASE 2: DIRECT LOGIN (NO OTP)
      else {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/centrallab"); 
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      
      // Check different error scenarios
      if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("not found")) {
        setErrors({ ...errors, email: errorMessage, password: "", general: "" });
      } 
      else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ ...errors, password: errorMessage, email: "", general: "" });
      }
      else {
        setErrors({ ...errors, general: errorMessage, email: "", password: "" });
      }
    }
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
              <label><i className="fa-solid fa-user" style={{ color: "black" }}></i>Your Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={form.email}
              />
              {errors.email && <div className="error-message" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.email}</div>}
            </div>

            <div className="input-group">
              <label><i className="fa-solid fa-lock" style={{ color: "black" }}></i>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={form.password}
              />
              {errors.password && <div className="error-message" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.password}</div>}
            </div>
            
            {errors.general && <div className="error-message" style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px" }}>{errors.general}</div>}
            
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