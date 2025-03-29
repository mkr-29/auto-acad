import { apiRequest } from "../API/axios";
import { apiRoutes } from "../Routes/apiRoutes";
import { getUserId } from "../Utils/helper";

export const EmailService = {
  addEmail: async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.addEmail.method,
        apiRoutes.addEmail.url,
        data,
        token
      );
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
  getEmails: async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserId();
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.getEmails.method,
        apiRoutes.getEmails.url.replace(":userId", userId),
        null,
        token
      );
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
  deleteEmail: async (templateId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.deleteEmail.method,
        apiRoutes.deleteEmail.url.replace(":templateId", templateId),
        null,
        token
      );
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
  getEmailTemplate: async (templateId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.getEmailTemplate.method,
        apiRoutes.getEmailTemplate.url.replace(":templateId", templateId),
        null,
        token
      );
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
};
