import axios from "axios";
import { constants } from "../Utils/constants";
import { getLocalStorageToken } from "../Utils/helper";

export const apiRequest = async (method, endpoint, payload, token = null) => {
  let apiToken = null;
  if (token) {
    apiToken = token;
  } else {
    apiToken = getLocalStorageToken();
  }
  try {
    const axiosConfig = {
      method: method || "GET",
      baseURL: constants.BASE_URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        timezome: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `Bearer ${apiToken}`,
      };
    }
    if (endpoint) {
      axiosConfig.url = endpoint;
    }
    if (payload) {
      const bodyPayload = {};
      for (const key in payload) {
        let element = payload[key];
        if (typeof element === "string") {
          element = element.trim();
        }
        if (![null, undefined, NaN].includes(element)) {
          bodyPayload[key] = element;
        }
      }
      axiosConfig.data = bodyPayload;
    }
    const response = await axios(axiosConfig);

    if(response.status >= 400) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
