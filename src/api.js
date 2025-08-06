// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export const getUsers = () => axios.get(`${BASE_URL}/all`);
export const claimPoints = (userId) => axios.post(`${BASE_URL}/claim/${userId}`);
export const getLeaderboard = () => axios.get(`${BASE_URL}/leaderboard`);
export const addUser = (name) => axios.post(`${BASE_URL}/add`, { name });
