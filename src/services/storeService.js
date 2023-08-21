import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let storeService = {
  getAllStore: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/store`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getStoresNearest: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/store`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllOrder: async (idAccount) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/store/${idAccount}/orders`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
