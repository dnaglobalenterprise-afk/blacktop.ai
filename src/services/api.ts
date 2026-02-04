import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  getCompliance: (carrierId: string) => 
    axios.get(`${API_BASE_URL}/drivers/compliance?carrierId=${carrierId}`),
  globalSearch: (query: string) => 
    axios.get(`${API_BASE_URL}/search?q=${query}`),
  triggerAgentEmail: (data: any) =>
    axios.post(`${API_BASE_URL}/notifications/agent-email`, data)
};
