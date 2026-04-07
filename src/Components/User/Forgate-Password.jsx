import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/userotp.css"; // apna CSS path sahi karo

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // step 1: email, step 2: new password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //  STEP 1 - Email Verify
  function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
     console.log("All Users:", users);
  console.log("Entered Email:", email);

    const userExists = users.find(
      (x) => x.email?.toLowerCase() === email.toLowerCase()
    );

    if (!userExists) {
      setError("No account found with this email ❌");
      return;
    }

    // Email sahi hai → step 2 pe jao
    setStep(2);
  }

  //  STEP 2 - New Password Save
  function handleResetSubmit(e) {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    //  users array mein us user ka password update karo
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((x) => {
      if (x.email?.toLowerCase() === email.toLowerCase()) {
        return { ...x, password: newPassword }; // password update
      }
      return x;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password Reset Successful! Please login ✅");
    navigate("/"); // login page pe bhejo
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
          <p className="subtitle">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </p>

          {/* ── STEP 1: Email Enter ── */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <label>
                  <i className="fa-solid fa-envelope" style={{ color: "black" }}></i>{" "}
                  Registered Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}

              <div className="btn-group">
                <button type="submit" className="login-btn">
                  Verify Email
                </button>
              </div>

              <div className="create">
                <p
                  className="forgot d-flex fs-6 mt-4 ms-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Back to Login
                </p>
              </div>
            </form>
          )}

          {/* ── STEP 2: New Password ── */}
          {step === 2 && (
            <form onSubmit={handleResetSubmit}>
              <div className="input-group">
                <label>
                  <i className="fa-solid fa-lock" style={{ color: "black" }}></i>{" "}
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>
                  <i className="fa-solid fa-lock" style={{ color: "black" }}></i>{" "}
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}

              <div className="btn-group">
                <button type="submit" className="login-btn">
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}