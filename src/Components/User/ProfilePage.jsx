// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
// import api from "../../api/axiosConfig";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const fileRef = useRef(null);

//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
//     bio: "",
//     photo: null,
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [preview, setPreview] = useState(null);
//   const [imageVersion, setImageVersion] = useState(Date.now());

//   async function loadProfile() {
//     try {
//       const token = localStorage.getItem("token");

//       setLoading(true);

//       const res = await api.get("/profile");

//       setProfileData({
//         name: res.data.full_name || "",
//         email: res.data.email || "",
//         phone: res.data.phone || "",
//         dob: res.data.dob
//           ? new Date(res.data.dob).toISOString().split("T")[0]
//           : "",
//         gender: res.data.gender || "",
//         city: res.data.city || "",
//         state: res.data.state || "",
//         address: res.data.address || "",
//         bio: res.data.bio || "",
//         photo: res.data.photo || null,
//       });
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ✅ PAGE LOAD
//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const initials =
//     profileData.name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2) || "?";

//   function handleChange(e) {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   }

//   function handlePhotoChange(e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file)); // preview ke liye
//     setProfileData({ ...profileData, photo: file });
//   }

//   async function handleUpdate() {
//     try {
//       const token = localStorage.getItem("token");

//       const formData = new FormData();

//       formData.append("full_name", profileData.name);
//       formData.append("dob", profileData.dob);
//       formData.append("gender", profileData.gender);
//       formData.append("city", profileData.city);
//       formData.append("state", profileData.state);
//       formData.append("address", profileData.address);
//       formData.append("bio", profileData.bio);

//       if (fileRef.current.files[0]) {
//         formData.append("photo", fileRef.current.files[0]);
//       }

//       const res = await api.put("/profile", formData);
//       alert(res.data.message);
//       setPreview(null);
//       setImageVersion(Date.now()); 
//       await loadProfile();
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   const inp = {
//     width: "100%",
//     padding: "9px 11px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     fontSize: "14px",
//     boxSizing: "border-box",
//     color: "#333",
//     background: "white",
//     outline: "none",
//   };

//   const readOnlyInp = {
//     ...inp,
//     background: "#f5f5f5",
//     color: "#999",
//     cursor: "not-allowed",
//   };

//   const labelSt = {
//     fontSize: "12px",
//     color: "#888",
//     display: "block",
//     marginBottom: "4px",
//   };
//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "150px" }}>
//         <h3>Loading profile...</h3>
//       </div>
//     );
//   }
//   return (
//     <div
//       style={{
//         maxWidth: "680px",
//         margin: "2rem auto",
//         padding: "0 1rem",
//         marginTop: "120px",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           borderRadius: "14px",
//           border: "0.5px solid #e0e0e0",
//           overflow: "hidden",
//           boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//         }}
//       >
//         <div style={{ background: "#185fa5", height: "100px" }}></div>

//         <div style={{ padding: "0 1.5rem 2rem" }}>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginTop: "-50px",
//               marginBottom: "1.5rem",
//             }}
//           >
//             <div style={{ position: "relative" }}>
//               {profileData.photo ? (
//                 <img
//                   src={
//                     preview
//                       ? preview
//                       : profileData.photo
//                         ? `http://localhost:5000${profileData.photo}?t=${imageVersion}`
//                         : ""
//                   }
//                   alt="profile"
//                   style={{
//                     width: "95px",
//                     height: "95px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     border: "3px solid white",
//                   }}
//                 />
//               ) : (
//                 <div
//                   style={{
//                     width: "95px",
//                     height: "95px",
//                     borderRadius: "50%",
//                     background: "#e6f1fb",
//                     border: "3px solid white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "30px",
//                     fontWeight: "500",
//                     color: "#185fa5",
//                   }}
//                 >
//                   {initials}
//                 </div>
//               )}

//               {editMode && (
//                 <div
//                   onClick={() => fileRef.current.click()}
//                   style={{
//                     position: "absolute",
//                     bottom: "2px",
//                     right: "2px",
//                     width: "28px",
//                     height: "28px",
//                     borderRadius: "50%",
//                     background: "#185fa5",
//                     border: "2px solid white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   📷
//                 </div>
//               )}

//               <input
//                 ref={fileRef}
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handlePhotoChange}
//               />
//             </div>

//             <p
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "500",
//                 margin: "10px 0 2px",
//                 color: "#222",
//               }}
//             >
//               {profileData.name || "Your Name"}
//             </p>

//             <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
//               {profileData.email}
//             </p>

//             {!editMode && (
//               <div
//                 onClick={() => setEditMode(true)}
//                 style={{
//                   marginTop: "10px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   cursor: "pointer",
//                   color: "#185fa5",
//                   fontSize: "13px",
//                   fontWeight: "500",
//                   border: "1px solid #185fa5",
//                   borderRadius: "20px",
//                   padding: "5px 14px",
//                 }}
//               >
//                 <FaEdit style={{ fontSize: "13px" }} />
//                 Edit Profile
//               </div>
//             )}
//           </div>

//           {/* ── DETAILS VIEW (editMode false) ── */}
//           {!editMode ? (
//             <div
//               style={{
//                 background: "#f9f9f9",
//                 borderRadius: "10px",
//                 padding: "1.2rem",
//                 border: "0.5px solid #eee",
//               }}
//             >
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "14px",
//                 }}
//               >
//                 <div>
//                   <p style={labelSt}>Full Name</p>
//                   <p style={valSt}>{profileData.name || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>Email</p>
//                   <p style={valSt}>{profileData.email || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>Contact Number</p>
//                   <p style={valSt}>{profileData.phone || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>Date of Birth</p>
//                   <p style={valSt}>{profileData.dob || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>Gender</p>
//                   <p style={valSt}>{profileData.gender || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>City</p>
//                   <p style={valSt}>{profileData.city || "—"}</p>
//                 </div>

//                 <div>
//                   <p style={labelSt}>State</p>
//                   <p style={valSt}>{profileData.state || "—"}</p>
//                 </div>

//                 <div style={{ gridColumn: "span 2" }}>
//                   <p style={labelSt}>Address</p>
//                   <p style={valSt}>{profileData.address || "—"}</p>
//                 </div>

//                 <div style={{ gridColumn: "span 2" }}>
//                   <p style={labelSt}>Bio</p>
//                   <p style={valSt}>{profileData.bio || "—"}</p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // ── EDIT FORM (editMode true) ──
//             <>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "14px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div>
//                   <label style={labelSt}>Full Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     style={inp}
//                   />
//                 </div>

//                 <div>
//                   <label style={labelSt}>Email (read only)</label>
//                   <input
//                     type="email"
//                     value={profileData.email}
//                     readOnly
//                     style={readOnlyInp}
//                   />
//                 </div>

//                 <div>
//                   <label style={labelSt}>Contact Number</label>
//                   <input
//                     type="text"
//                     value={profileData.phone}
//                     readOnly
//                     style={readOnlyInp}
//                   />
//                 </div>

//                 <div>
//                   <label style={labelSt}>Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={profileData.dob}
//                     onChange={handleChange}
//                     style={inp}
//                   />
//                 </div>

//                 <div>
//                   <label style={labelSt}>Gender</label>
//                   <select
//                     name="gender"
//                     value={profileData.gender}
//                     onChange={handleChange}
//                     style={inp}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                     <option value="Prefer not to say">Prefer not to say</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={labelSt}>City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={profileData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     style={inp}
//                   />
//                 </div>

//                 <div>
//                   <label style={labelSt}>State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={profileData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     style={inp}
//                   />
//                 </div>

//                 <div style={{ gridColumn: "span 2" }}>
//                   <label style={labelSt}>Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={profileData.address}
//                     onChange={handleChange}
//                     placeholder="Full Address"
//                     style={inp}
//                   />
//                 </div>

//                 <div style={{ gridColumn: "span 2" }}>
//                   <label style={labelSt}>Bio</label>
//                   <textarea
//                     name="bio"
//                     value={profileData.bio}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder="Write something about yourself..."
//                     style={{
//                       ...inp,
//                       resize: "vertical",
//                       paddingTop: "8px",
//                       lineHeight: "1.5",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* BUTTONS */}
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button
//                   onClick={() => setEditMode(false)}
//                   style={{
//                     flex: 1,
//                     padding: "11px",
//                     background: "white",
//                     color: "#185fa5",
//                     border: "1px solid #185fa5",
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕ Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdate}
//                   style={{
//                     flex: 2,
//                     padding: "11px",
//                     background: "#185fa5",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "8px",
//                     fontSize: "15px",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Update Profile
//                 </button>
//               </div>
//             </>
//           )}

//           {/* BACK BUTTON */}
//           {!editMode && (
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 marginTop: "16px",
//                 width: "100%",
//                 padding: "10px",
//                 background: "white",
//                 color: "#185fa5",
//                 border: "1px solid #185fa5",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 cursor: "pointer",
//               }}
//             >
//               ← Back
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const valSt = {
//   fontSize: "14px",
//   color: "#333",
//   margin: 0,
//   fontWeight: "400",
//   wordBreak: "break-word",
// };

// // const labelSt = {
// //   fontSize: "12px",
// //   color: "#888",
// //   display: "block",
// //   marginBottom: "4px",
// //   margin: "0 0 4px",
// // };

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaCamera, FaArrowLeft, FaCheck, FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars, FaMapMarkerAlt, FaCity, FaFlag, FaAddressCard, FaInfoCircle } from "react-icons/fa";
import api from "../../api/axiosConfig";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    bio: "",
    photo: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [imageVersion, setImageVersion] = useState(Date.now());
  const [updateLoading, setUpdateLoading] = useState(false);

  async function loadProfile() {
    try {
      setLoading(true);
      const res = await api.get("/profile");

      setProfileData({
        name: res.data.full_name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        dob: res.data.dob
          ? new Date(res.data.dob).toISOString().split("T")[0]
          : "",
        gender: res.data.gender || "",
        city: res.data.city || "",
        state: res.data.state || "",
        address: res.data.address || "",
        bio: res.data.bio || "",
        photo: res.data.photo || null,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const initials = profileData.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  function handleChange(e) {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setProfileData({ ...profileData, photo: file });
  }

  async function handleUpdate() {
    try {
      setUpdateLoading(true);
      const formData = new FormData();

      formData.append("full_name", profileData.name);
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);
      formData.append("city", profileData.city);
      formData.append("state", profileData.state);
      formData.append("address", profileData.address);
      formData.append("bio", profileData.bio);

      if (fileRef.current.files[0]) {
        formData.append("photo", fileRef.current.files[0]);
      }

      const res = await api.put("/profile", formData);
      alert(res.data.message);
      setPreview(null);
      setImageVersion(Date.now());
      await loadProfile();
      setEditMode(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Profile</h1>
          <p style={styles.headerSubtitle}>Manage your personal information</p>
        </div>

        <div style={styles.content}>
          {/* Profile Section */}
          <div style={styles.profileSection}>
            <div style={styles.avatarWrapper}>
              {(profileData.photo && !preview) || preview ? (
                <img
                  src={preview || `http://localhost:5000${profileData.photo}?t=${imageVersion}`}
                  alt="profile"
                  style={styles.avatar}
                />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <span style={styles.initials}>{initials}</span>
                </div>
              )}

              {editMode && (
                <button onClick={() => fileRef.current.click()} style={styles.changePhotoBtn}>
                  <FaCamera size={14} />
                  <span style={{ marginLeft: "6px" }}>Change</span>
                </button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>

            <div style={styles.userInfo}>
              <h2 style={styles.userName}>{profileData.name || "Your Name"}</h2>
              <p style={styles.userEmail}>{profileData.email}</p>
            </div>

            {!editMode && (
              <button onClick={() => setEditMode(true)} style={styles.editProfileBtn}>
                <FaEdit size={14} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Details Section */}
          {!editMode ? (
            <div style={styles.detailsGrid}>
              <DetailCard icon={<FaUser />} label="Full Name" value={profileData.name} />
              <DetailCard icon={<FaEnvelope />} label="Email" value={profileData.email} />
              <DetailCard icon={<FaPhone />} label="Contact" value={profileData.phone} />
              <DetailCard icon={<FaCalendar />} label="Date of Birth" value={profileData.dob} />
              <DetailCard icon={<FaVenusMars />} label="Gender" value={profileData.gender} />
              <DetailCard icon={<FaCity />} label="City" value={profileData.city} />
              <DetailCard icon={<FaFlag />} label="State" value={profileData.state} />
              <DetailCard icon={<FaAddressCard />} label="Address" value={profileData.address} fullWidth />
              <DetailCard icon={<FaInfoCircle />} label="Bio" value={profileData.bio} fullWidth />
            </div>
          ) : (
            <div style={styles.editForm}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    readOnly
                    disabled
                    style={{ ...styles.input, ...styles.inputReadonly }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    readOnly
                    disabled
                    style={{ ...styles.input, ...styles.inputReadonly }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    style={styles.input}
                  />
                </div>

                <div style={{ ...styles.formGroup, gridColumn: "span 2" }}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    style={styles.input}
                  />
                </div>

                <div style={{ ...styles.formGroup, gridColumn: "span 2" }}>
                  <label style={styles.label}>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Write something about yourself..."
                    style={{ ...styles.input, ...styles.textarea }}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>
                  <FaTimes size={14} />
                  Cancel
                </button>
                <button onClick={handleUpdate} disabled={updateLoading} style={styles.saveBtn}>
                  {updateLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <FaCheck size={14} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Back Button */}
          {!editMode && (
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
              <FaArrowLeft size={14} />
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Detail Card Component
function DetailCard({ icon, label, value, fullWidth }) {
  return (
    <div style={{ ...styles.detailCard, ...(fullWidth && styles.detailCardFull) }}>
      <div style={styles.detailIcon}>{icon}</div>
      <div style={styles.detailContent}>
        <p style={styles.detailLabel}>{label}</p>
        <p style={styles.detailValue}>{value || "—"}</p>
      </div>
    </div>
  );
}

// Professional Black & White Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "1rem auto",
    padding: "0 1.5rem",
    marginTop: "80px",
    
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    border: "1px solid #E0E0E0",
    borderRadius:"50px"
  },
  header: {
    padding: "2rem 2rem 0 2rem",
    borderBottom: "1px solid #E0E0E0",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "300",
    margin: "0 0 0.5rem 0",
    color: "#000000",
    letterSpacing: "-0.5px",
  },
  headerSubtitle: {
    fontSize: "14px",
    color: "#666666",
    margin: "0 0 1.5rem 0",
  },
  content: {
    padding: "2rem",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #F0F0F0",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: "1rem",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #000000",
  },
  avatarPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#F5F5F5",
    border: "2px solid #000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: "36px",
    fontWeight: "400",
    color: "#000000",
  },
  changePhotoBtn: {
    position: "absolute",
    bottom: "0",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    transition: "background 0.2s",
    borderRadius: "0",
  },
  userInfo: {
    textAlign: "center",
    marginTop: "1rem",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "500",
    margin: "0 0 0.25rem 0",
    color: "#000000",
  },
  userEmail: {
    fontSize: "13px",
    color: "#666666",
    margin: 0,
  },
  editProfileBtn: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 20px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
    borderRadius: "0",
    letterSpacing: "0.5px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  detailCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "1rem",
    background: "#FAFAFA",
    border: "1px solid #F0F0F0",
  },
  detailCardFull: {
    gridColumn: "span 2",
  },
  detailIcon: {
    color: "#000000",
    fontSize: "18px",
    marginTop: "2px",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#999999",
    marginBottom: "6px",
  },
  detailValue: {
    fontSize: "14px",
    color: "#333333",
    margin: 0,
    lineHeight: "1.5",
  },
  editForm: {
    marginBottom: "1.5rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#666666",
    marginBottom: "8px",
  },
  input: {
    padding: "10px 12px",
    background: "#FFFFFF",
    border: "1px solid #CCCCCC",
    fontSize: "14px",
    fontFamily: "inherit",
    color: "#000000",
    outline: "none",
    transition: "border-color 0.2s",
    borderRadius: "0",
  },
  inputReadonly: {
    background: "#F5F5F5",
    color: "#999999",
    cursor: "not-allowed",
    borderColor: "#E0E0E0",
  },
  textarea: {
    resize: "vertical",
    fontFamily: "inherit",
  },
  formActions: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  cancelBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    background: "#FFFFFF",
    color: "#000000",
    border: "1px solid #CCCCCC",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "0",
    letterSpacing: "0.5px",
  },
  saveBtn: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
    borderRadius: "0",
    letterSpacing: "0.5px",
  },
  backBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    background: "#FFFFFF",
    color: "#666666",
    border: "1px solid #E0E0E0",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "0",
    marginTop: "0.5rem",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    marginTop: "100px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "2px solid #F0F0F0",
    borderTop: "2px solid #000000",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: "1rem",
    color: "#666666",
    fontSize: "14px",
  },
};

// Add keyframe animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  button:hover {
    opacity: 0.85;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #000000 !important;
  }
`;
document.head.appendChild(styleSheet);