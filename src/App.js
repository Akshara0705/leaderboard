import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Claim points
  const handleClaim = async () => {
    if (!selectedUser) return alert("Please select a user");

    const res = await axios.post(`http://localhost:5000/api/users/claim/${selectedUser}`);
    setMessage(`🎉 Claimed ${res.data.points} points!`);
    fetchUsers(); // update leaderboard
  };

  // Add user (🔍 Debug version)
  const handleAddUser = async () => {
    if (!newUser.trim()) return alert("Enter user name");

    console.log("📤 Trying to add user:", newUser);

    try {
      const res = await axios.post("http://localhost:5000/api/users", { name: newUser });
      console.log("✅ Server response:", res.data);

      setNewUser("");
      fetchUsers(); // refresh list
      setMessage(`✅ User "${newUser}" added!`);
    } catch (error) {
      console.error("💥 Error occurred while adding user:", error.response?.data || error.message);
      setMessage("❌ Error adding user");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🏆 Leaderboard</h2>

      {/* ADD USER */}
      <div>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter new user"
        />
        <button onClick={handleAddUser}>➕ Add User</button>
      </div>

      <br />

      {/* CLAIM POINTS */}
      <div>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <button onClick={handleClaim}>🎯 Claim Points</button>
      </div>

      {/* MESSAGE */}
      <p>{message}</p>

      {/* LEADERBOARD */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.totalPoints}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
