import { https } from "./configAxios";

export let storeService = {
  getAllStore: async () => {
    try {
      const response = await https.get(`/api/v1/store`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getStoresNearest: async () => {
    try {
      const response = await https.get(`/api/v1/store`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllOrder: async (idAccount) => {
    try {
      const response = await https.get(`/api/v1/store/${idAccount}/orders`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
