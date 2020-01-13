import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('beFitToken');

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};