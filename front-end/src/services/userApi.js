import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response;
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    throw error; // repassa para o componente que chamou
  }
};

export const getUserByCpf = async (cpf) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${cpf}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar o usuário com CPF ${cpf}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user`, userData);
    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUser = async (cpf, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${cpf}`, userData);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar usuário com CPF ${cpf}:`, error);
    throw error;
  }
};

export const deleteUser = async (cpf) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/${cpf}`);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar usuário com CPF ${cpf}:`, error);
    throw error;
  }
};
