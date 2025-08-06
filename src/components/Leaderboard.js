// src/components/Leaderboard.js
import React from 'react';

const Leaderboard = ({ data }) => (
  <div>
    <h2>🏆 Leaderboard</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
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

export default Leaderboard;
