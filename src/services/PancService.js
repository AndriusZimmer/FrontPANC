import axios from 'axios';

const API_URL = 'https://panc-backend.onrender.com'; // change if your API URL is different

export default {
  async getAllPancs() {
    try {
      const response = await axios.get(`${API_URL}/pancs`, { headers: {
        "x-api-key": 'panc'
      }});
      return response.data;
    } catch (error) {
      console.error('Error fetching Pancs:', error);
      throw error;
    }
  },

  async getPancById(id) {
    try {
      const response = await axios.get(`${API_URL}/pancs/${id}`, {
      headers: {
        "x-api-key": 'panc'
      }
    });
      return response.data;
    } catch (error) {
      console.error(`Error fetching Panc ${id}:`, error);
      throw error;
    }
  },

  async detectar(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/pancs/detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
           "x-api-key": 'panc'
        }
    
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};
