import axios from 'axios';

const API_URL = 'http://localhost:3000/farmers';

export const getFarmers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFarmer = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateFarmer = async (id: string, data: any) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};