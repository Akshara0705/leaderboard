// src/components/UserSelector.js
import React from 'react';

const UserSelector = ({ users, selectedUser, onChange }) => (
  <select value={selectedUser} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select User</option>
    {users.map(user => (
      <option key={user._id} value={user._id}>{user.name}</option>
    ))}
  </select>
);

export default UserSelector;
