import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    let res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  }

  async function toggleRole(user) {
    try {
      let res = await axios.put(
        `http://localhost:5000/api/users/${user.id}/role`,
        {
          role: user.role === "admin" ? "user" : "admin",
        }
      );

      alert(res.data.message);
      fetchUsers();

    } catch (err) {
      alert("Error updating role");
    }
  }

  async function toggleRole(user) {
    try {
      const newRole = user.role === "admin" ? "user" : "admin";

      await axios.put(
        `http://localhost:5000/api/users/${user.id}/role`,
        { role: newRole }
      );

      // 🔥 UI instant update (NO REFRESH)
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, role: newRole } : u
        )
      );

    } catch (err) {
      alert("Error updating role");
    }
  }

  return (
    <div style={container}>

      {/* 🔥 HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>👥 Users Management</h2>

        {/* USER COUNT */}
        <span style={countBadge}>
          Total Users: {users.length}
        </span>
      </div>

      <div style={tableContainer}>

        {/* HEADER ROW */}
        <div style={headerRow}>
          <span style={headerCell}>Name</span>
          <span style={headerCell}>Email</span>
          <span style={headerCell}>Phone</span>
          <span style={headerCell}>Role</span>
          <span style={headerCell}>Action</span>
        </div>

        {/* DATA ROWS */}
        {users.map((user, index) => (
          <div key={index} style={row}>

            <div style={cell}>
              <div style={nameBox}>
                <div style={avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </div>
            </div>

            <div style={cell}>{user.email}</div>
            <div style={cell}>{user.phone}</div>

            <div style={cell}>
              <span
                style={{
                  ...badge,
                  backgroundColor:
                    user.role === "admin" ? "#ff4d4f" : "#4CAF50",
                }}
              >
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            </div>

            <div style={cell}>
              <button
                onClick={() => toggleRole(user)}
                style={{
                  ...button,
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border:
                    user.role === "admin"
                      ? "1px solid #eb161a"
                      : "1px solid #4CAF50",
                  color:
                    user.role === "admin"
                      ? "#ff4d4f"
                      : "#4CAF50",
                  fontWeight: "500",
                  transition: "0.3s",
                }}
              >
                {user.role === "admin"
                  ? "Remove Admin"
                  : "Make Admin"}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}


//////////////// STYLES //////////////////

const container = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const countBadge = {
  background: "#4CAF50",
  color: "#fff",
  padding: "6px 15px",
  borderRadius: "20px",
  fontSize: "14px",
};

const tableContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const headerRow = {
  display: "grid",
  gridTemplateColumns: "1.5fr 2fr 1.5fr 1fr 1.5fr",
  padding: "12px",
  background: "white",
  color: "black",
  borderRadius: "8px",
};

const headerCell = {
  fontWeight: "600",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1.5fr 2fr 1.5fr 1fr 1.5fr",
  padding: "15px",
  background: "#fff",
  borderRadius: "10px",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const cell = {
  fontSize: "14px",
};

const nameBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const avatar = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  border: "1px solid black",
  background: "white",
  color: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const badge = {
  padding: "5px 12px",
  borderRadius: "20px",
  color: "#fff",
  fontSize: "12px",
};

const button = {
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};