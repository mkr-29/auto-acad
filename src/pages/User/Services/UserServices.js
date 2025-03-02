import { apiRequest } from "../API/axios";
import { apiRoutes } from "../Routes/apiRoutes";

export const UserServices = {
  register: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.register.method, apiRoutes.register.url, data);
      return response;
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        return error.response.data;
      } else {
        console.error("Error Message:", error.message);
        return error.message;
      }
    }
  },
  login: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.login.method, apiRoutes.login.url, data);
      return response;
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        return error.response.data;
      } else {
        console.error("Error Message:", error.message);
        return error.message;
      }
    }
  },
  getStudent: async (data) => {
    try {
      const response = await apiRequest(apiRoutes.getStudent.method, apiRoutes.getStudent.url, data);
      return response;
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        return error.response.data;
      } else {
        console.error("Error Message:", error.message);
        return error.message;
      }
    }
  }
};
