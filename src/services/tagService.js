import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let tagService = {
  getAllTags: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/tag/get`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  create: async (request) => {
    try {
      const response = await axios.post(BASE_URL + `/api/v1/tag/add`, request);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  update: async (request) => {
    try {
      const response = await axios.put(BASE_URL + `/api/v1/tag/edit`, request);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await axios.delete(
        BASE_URL + `/api/v1/tag/delete/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
