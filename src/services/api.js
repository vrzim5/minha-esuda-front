import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3000",
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const registerUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/signup", { email, password });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};


export const getDocumentData = async (qrCodeData) => {
  try {
    const response = await api.post("/api/students", { qrCodeData });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};