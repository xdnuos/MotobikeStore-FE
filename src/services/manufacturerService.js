import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let manufacturerService = {
  getAllManufacturer: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/manufacturer/get`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (request) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/manufacturer/add`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (request) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/manufacturer/edit`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await axios.delete(
        BASE_URL + `/api/v1/manufacturer/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
