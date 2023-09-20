import { https } from "./configAxios";

export let manufacturerService = {
  getAllManufacturer: async () => {
    try {
      const response = await https.get(`/api/v1/manufactures`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req) => {
    try {
      const response = await https.post(`/api/v1/admin/manufactures`, req);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (req) => {
    try {
      const response = await https.put(`/api/v1/admin/manufactures`, req);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await https.delete(`/api/v1/admin/manufactures/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
