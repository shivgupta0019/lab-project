import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      let res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setUsers(res.data);

    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }

  // 🔥 UPDATED FUNCTION (ONLY THIS CHANGED)
  async function toggleRole(user) {
    try {
      const newRole = user.role === "admin" ? "user" : "admin";

      await axios.put(
        `http://localhost:5000/api/users/${user.id}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // 🔥 UI instantly update
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, role: newRole } : u
        )
      );

    } catch (err) {
      alert("Error updating role");
    }
  }

  return (
    <>
      <style>{`
        .users-container {
          padding: 30px;
          background: #f4f6f8;
          min-height: 100vh;
        }
        .users-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          margin-top: 100px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .count-badge {
          background: #4CAF50;
          color: #fff;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 14px;
          white-space: nowrap;
        }
        .table-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .header-row {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1.5fr 1fr 1.5fr;
          padding: 12px;
          background: white;
          color: black;
          border-radius: 8px;
        }
        .header-cell {
          font-weight: 600;
        }
        .data-row {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1.5fr 1fr 1.5fr;
          padding: 15px;
          background: #fff;
          border-radius: 10px;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .data-cell {
          font-size: 14px;
          word-break: break-word;
        }
        .name-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 35px;
          height: 35px;
          min-width: 35px;
          border-radius: 50%;
          border: 1px solid black;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .role-badge {
          padding: 5px 12px;
          border-radius: 20px;
          color: #fff;
          font-size: 12px;
          display: inline-block;
        }
        .role-btn {
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          background: transparent;
          font-weight: 500;
          transition: 0.3s;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .users-container {
            padding: 16px;
          }
          .header-row {
            display: none;
          }
          .data-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 14px;
          }
          .data-cell {
            width: 100%;
          }
          .data-cell::before {
            content: attr(data-label);
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 3px;
          }
          .data-cell.name-cell::before {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .users-container {
            padding: 12px;
          }
          .users-header h2 {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="users-container">

        <div className="users-header">
          <h2 style={{ margin: 0 }}>👥 Users Management</h2>
          <span className="count-badge">
            Total Users: {users.length}
          </span>
        </div>

        <div className="table-container">

          <div className="header-row">
            <span className="header-cell">Name</span>
            <span className="header-cell">Email</span>
            <span className="header-cell">Phone</span>
            <span className="header-cell">Role</span>
            <span className="header-cell">Action</span>
          </div>

          {users.map((user, index) => (
            <div key={index} className="data-row">

              <div className="data-cell name-cell">
                <div className="name-box">
                  <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </div>
              </div>

              <div className="data-cell" data-label="Email">{user.email}</div>
              <div className="data-cell" data-label="Phone">{user.phone}</div>

              <div className="data-cell" data-label="Role">
                <span
                  className="role-badge"
                  style={{
                    backgroundColor: user.role === "admin" ? "#ff4d4f" : "#4CAF50",
                  }}
                >
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </div>

              <div className="data-cell" data-label="Action">
                <button
                  onClick={() => toggleRole(user)}
                  className="role-btn"
                  style={{
                    border: user.role === "admin" ? "1px solid #eb161a" : "1px solid #4CAF50",
                    color: user.role === "admin" ? "#eb161a" : "#4CAF50",
                  }}
                >
                  {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}