import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { FaFlask, FaVial, FaChartLine, FaUserShield } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../home/Navbar.css";


export default function Dashboard() {
 

const navigate = useNavigate();

  const [role, setRole] = useState("");

  //  FIXED: useEffect yaha hona chahiye (NOT inside useState)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); //  admin/user set hoga
      } catch {
        localStorage.clear();
        navigate("/");
      }
    }
  }, []);

  // user data
  const [user] = useState(() => {
    const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    return {
      name: profileData.name || loggedInUser.name || "Guest",
      username: profileData.username || loggedInUser.username || "guest",
      email: profileData.email || loggedInUser.email || "N/A",
      phone: profileData.phone || loggedInUser.phone || "N/A",
      role: loggedInUser.role || "User",
      photo: profileData.photo || null,
    };
  });

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  //  FINAL LOGOUT (PROPER)
  function handleLogout() {
    // clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("profileData");

    //  important: pura app reset
    window.location.href = "/";
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg modern-navbar">
        <div className="container-fluid">
          {/* LOGO */}
          <a
            className="navbar-brand brand-logo d-flex align-items-center"
            href="#"
          >
            <img
              src="assets/photos/aryan.jpeg"
              alt="Aryan Logo"
              className="logo-img"
            />
            <span className="ms-2">Aryan Group</span>
          </a>

          <button
            className="navbar-toggler text-black"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            ☰
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* LEFT MENU */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links-modern">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <FaUserShield className="nav-icon" /> Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/centrallab">
                  <FaFlask className="nav-icon" /> Labs Report
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/project">
                  <FaVial className="nav-icon" /> Research & Development
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/result">
                  <FaChartLine className="nav-icon" /> Result
                </Link>
              </li> */}

              {/* 🔥 ADMIN ONLY */}
              {role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <FaUserShield className="nav-icon" /> Admin
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      <FaUserShield className="nav-icon" /> Users
                    </Link>
                  </li>
                </>
              )}

              {/* ✅ Sabko dikhe */}
              <li className="nav-item">
                <Link className="nav-link" to="/centrallab">
                  <FaFlask className="nav-icon" /> Labs Report
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/project">
                  <FaVial className="nav-icon" /> Research & Development
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/result">
                  <FaChartLine className="nav-icon" /> Result
                </Link>
              </li>
            </ul>

            {/*  RIGHT PROFILE */}
            <div className="profile-container">
              <div className="profile-box">
                {/* ✅ Photo ya icon */}
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="avatar"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid white",
                    }}
                  />
                ) : (
                  <FaUserCircle className="profile-icon" />
                )}

                <div className="profile-text">
                  {/*  Real name from localStorage */}
                  <span className="username">{user.name}</span>
                  <span className="role">{role}</span>
                </div>
              </div>

              {/*  DROPDOWN */}
              <div className="dropdown-menu-modern">
                {/* Avatar + Name - dropdown top */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="avatar"
                      style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #185fa5",
                        marginBottom: "8px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        background: "#e6f1fb",
                        border: "2px solid #185fa5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        fontWeight: "500",
                        color: "#185fa5",
                        marginBottom: "8px",
                      }}
                    >
                      {initials}
                    </div>
                  )}
                  <p
                    style={{ fontWeight: "500", fontSize: "14px", margin: "0" }}
                  >
                    {user.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                    {user.role}
                  </p>
                </div>

                <hr style={{ margin: "8px 0" }} />

                {/*  Real Data */}
                <p style={{ fontSize: "13px", margin: "5px 0" }}>
                  <strong>Name:</strong> {user.name}
                </p>
                <p style={{ fontSize: "13px", margin: "5px 0" }}>
                  <strong>Username:</strong> {user.username}
                </p>
                <p style={{ fontSize: "13px", margin: "5px 0" }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ fontSize: "13px", margin: "5px 0" }}>
                  <strong>Contact:</strong> {user.phone}
                </p>

                <hr style={{ margin: "10px 0" }} />

                {/*  Edit Profile - profile page pe jao */}
                <button
                  onClick={() => navigate("/profile")}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#185fa5",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    cursor: "pointer",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <FaEdit style={{ fontSize: "13px" }} />
                  Edit Profile
                </button>

                {/*  Logout */}
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
