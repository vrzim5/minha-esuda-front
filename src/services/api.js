import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3001",
});

export const getDocumentData = async (qrCodeData) => {
  try {
    const response = await api.post("/documents", { qrCodeData });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};