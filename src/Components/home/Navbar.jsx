// import React from 'react';
// import { FaUserCircle } from "react-icons/fa";
// import {
//   FaFlask,
//   FaUsers,
//   FaProjectDiagram,
//   FaBoxes,
//   FaTools,
//   FaVial
// } from "react-icons/fa";

// import './3000.css';

// export default function Navbar() {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg modern-navbar">

//         <div className="container-fluid">

//           <a className="navbar-brand brand-logo d-flex align-items-center" href="#">
//   <img
//     src="/assets/aryan.jpeg"
//     alt="Aryan Logo"
//     className="logo-img"
//   />
//   <span className="ms-2">Aryan Group</span>
// </a>

//           <button
//             className="navbar-toggler text-white"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//           >
//             ☰
//           </button>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">

//             {/* LEFT MENU */}
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links-modern">

//               <li className="nav-item">
//                 <a className="nav-link" href="/cetrallab">
//                   <FaFlask className="nav-icon" /> Central Lab
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/user">
//                   <FaUsers className="nav-icon" /> User
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/project">
//                   <FaProjectDiagram className="nav-icon" /> Project
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/raw">
//                   <FaBoxes className="nav-icon" /> Raw Material
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/instrument">
//                   <FaTools className="nav-icon" /> Instrument
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/test">
//                   <FaVial className="nav-icon" /> Test
//                 </a>
//               </li>

//             </ul>

//             {/* RIGHT PROFILE */}
//             <div className="profile-container">

//               <div className="profile-box">
//                 <FaUserCircle className="profile-icon" />

//                 <div className="profile-text">
//                   <span className="username">JohnDoe</span>
//                   <span className="role">Admin</span>
//                 </div>
//               </div>

//               {/* DROPDOWN */}
//               <div className="dropdown-menu-modern">
//                 <p><strong>Name:</strong> John Doe</p>
//                 <p><strong>Username:</strong> johndoe</p>
//                 <p><strong>Email:</strong> john@email.com</p>
//                 <p><strong>Contact:</strong> 9876543210</p>
//                 <hr />
//                 <button className="logout-btn">Logout</button>
//               </div>

//             </div>

//           </div>

//         </div>
//       </nav>
//     </>
//   );
// }


import React from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import {
  FaFlask,
  FaUsers,
  FaProjectDiagram,
  FaBoxes,
  FaTools,
  FaVial,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import "../home/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  //  logged-in user id
  const userId = localStorage.getItem("userId");

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
                <Link className="nav-link" to="/user">
                  <FaUsers className="nav-icon" />User
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/metairial">
                  <FaBoxes className="nav-icon" /> Raw Material
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/instrument">
                  <FaTools className="nav-icon" /> Instrument
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/test">
                  <FaVial className="nav-icon" /> Test
                </Link>
              </li>
            </ul>

            {/* RIGHT PROFILE */}
            <div className="profile-container">
              <div className="profile-box">
                <FaUserCircle className="profile-icon" />

                <div className="profile-text">
                  {/* 🔥 NAME + EDIT BUTTON */}
                  {/* <div className="name-row">
                    <span className="username">JohnDoe</span>

                    <FaEdit
                      className="edit-icon"
                      title="Edit Profile"
                      onClick={() => navigate(/user/edit/${userId})}
                    />
                  </div> */}
                  <span className="username">JohnDoe</span>

                  <span className="role">Admin</span>
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
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Username:</strong> johndoe
                </p>
                <p>
                  <strong>Email:</strong> john@email.com
                </p>
                <p>
                  <strong>Contact:</strong> 9876543210
                </p>
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