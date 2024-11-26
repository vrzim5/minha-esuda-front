import axios from "axios";
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao fazer login';
    return { success: false, message };
  }
};

export const registerUser = async (email, password, name) => {
  try {
    const response = await api.post("/api/auth/signup", { email, password, name });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao registrar usuário';
    return { success: false, message };
  }
};

export const getDocumentData = async (qrCodeData) => {
  try {
    const response = await api.post("/api/students", { qrCodeData });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao obter dados do documento';
    return { success: false, message };
  }
};