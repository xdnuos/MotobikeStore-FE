import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let manufacturerService = {
  getAllManufacturer: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/manufacturer/get`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
