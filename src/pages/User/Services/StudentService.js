import { apiRequest } from "../API/axios";
import { apiRoutes } from "../Routes/apiRoutes";

export const StudentService = {
  addStudent: async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.addStudent.method,
        apiRoutes.addStudent.url,
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
  addCollege: async (data) => {
    try {
      const response = await apiRequest(
        apiRoutes.addCollege.method,
        apiRoutes.addCollege.url,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
  addSubject: async (data) => {
    try {
      const response = await apiRequest(
        apiRoutes.addSubject.method,
        apiRoutes.addSubject.url,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
  addParents: async (data) => {
    try {
      const response = await apiRequest(
        apiRoutes.addParents.method,
        apiRoutes.addParents.url,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
  getStudentsByUserId: async (userId, params) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }
    try {
      const response = await apiRequest(
        apiRoutes.getStudentsByUserId.method,
        apiRoutes.getStudentsByUserId.url + `/${userId}`,
        token,
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
};
