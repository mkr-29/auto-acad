import { apiRequest } from "../API/axios";
import { apiRoutes } from "../Routes/apiRoutes";

export const UserServices = {
  register: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.register.method, apiRoutes.register.url, data);
      return response;
    } catch (error) {
      // If the error is already processed by apiRequest, just rethrow it
      if (error.message) {
        throw error;
      }
      // If it's an axios error, process it
      if (error.response?.data) {
        throw new Error(error.response.data.message || "Registration failed");
      }
      // For any other error
      throw new Error(error.message || "Registration failed");
    }
  },
  login: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.login.method, apiRoutes.login.url, data);
      return response;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error(error.message || "Login failed");
    }
  },
  getStudent: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.getStudent.method, apiRoutes.getStudent.url, data);
      return response;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || "Failed to get student data");
      }
      throw new Error(error.message || "Failed to get student data");
    }
  }
};
