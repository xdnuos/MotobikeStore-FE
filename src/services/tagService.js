import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let tagService = {
  getAllTags: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/tags`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req) => {
    try {
      const response = await axios.post(BASE_URL + `/api/v1/admin/tags`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (req) => {
    try {
      const response = await axios.put(BASE_URL + `/api/v1/admin/tags`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await axios.delete(
        BASE_URL + `/api/v1/admin/tags/${id}`,
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
