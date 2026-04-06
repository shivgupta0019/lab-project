import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import {
  // FaFlask,
  // FaUsers,
  // FaProjectDiagram,
  // FaBoxes,
  FaFlask,
  FaVial,
  FaChartLine,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "../home/Navbar.css";

export default function Dashboard() {
  //  logged-in user id
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [labData, setLabData] = useState(null);

  // Load user and lab data from localStorage
  useEffect(() => {
    // Get user data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.empid === userId || u.userId === userId);
    if (user) {
      setUserData(user);

      // Get lab data based on user's lab code
      if (user.labCode || user.labcode) {
        const labs = JSON.parse(localStorage.getItem("centrallab")) || [];
        const lab = labs.find((l) => l.code === (user.labCode || user.labcode));
        if (lab) {
          setLabData(lab);
        }
      }
    }
  }, [userId]);

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
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            ☰
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* LEFT MENU */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links-modern">
              <li className="nav-item">
                <Link className="nav-link" to="/centrallab">
                  <FaFlask className="nav-icon" /> Labs
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
            {/* RIGHT PROFILE */}
            <div className="profile-container">
              <div className="profile-box">
                <FaUserCircle className="profile-icon" />

                <div className="profile-text">
                  {/* NAME + EDIT BUTTON */}
                  {/* <div className="name-row">
                    <span className="username">JohnDoe</span>

                    <FaEdit
                      className="edit-icon"
                      title="Edit Profile"
                      onClick={() => navigate(/user/edit/${userId})}
                    />
                  </div> */}
                  <span className="username">
                    {userData
                      ? `${userData.firstname || ""} ${userData.lastname || ""}`.trim()
                      : "Loading..."}
                  </span>

                  <span className="role">{userData?.role || "User"}</span>
                </div>
              </div>

              {/* DROPDOWN */}
              <div className="dropdown-menu-modern">
                <FaEdit
                  className="dropdown-edit-icon"
                  title="Edit Profile"
                  // onClick={() => navigate(/user/edit/${userId})}
                />
                <p>
                  <strong>Name:</strong>{" "}
                  {userData
                    ? `${userData.firstname || ""} ${userData.lastname || ""}`.trim()
                    : "Loading..."}
                </p>
                <p>
                  <strong>Employee ID:</strong> {userData?.empid || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {userData?.role || "N/A"}
                </p>
                <p>
                  <strong>Department:</strong> {userData?.department || "N/A"}
                </p>
                <p>
                  <strong>Lab:</strong>{" "}
                  {labData?.labname ||
                    userData?.labCode ||
                    userData?.labcode ||
                    "N/A"}
                </p>
                {labData && (
                  <p>
                    <strong>Location:</strong> {labData?.location || "N/A"}
                  </p>
                )}
                <hr />
                <button className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
