import axios from 'axios';

const API_URL = 'http://localhost:3000'; // change if your API URL is different

export default {
  async getAllPancs() {
    try {
      const response = await axios.get(`${API_URL}/panc`);
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

  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};
