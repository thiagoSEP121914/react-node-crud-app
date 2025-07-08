import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAllUsers = () => axios.get(`${API_BASE_URL}/user`)

export const getUserByCpf = (cpf) => axios.get(`${API_BASE_URL}/user/${cpf}`);

export const createUser = (userData) => axios.post(`${API_BASE_URL}/user`, userData);

export const updateUser = (cpf, userData) => axios.put(`${API_BASE_URL}/user/${cpf}`, userData);

export const deleteUser = (cpf) => axios.delete(`${API_BASE_URL}/user/${cpf}`);
