import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let tagService = {
  getAllTags: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/tag/get`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
