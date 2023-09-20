import { https } from "./configAxios";

export let tagService = {
  getAllTags: async () => {
    try {
      const response = await https.get(`/api/v1/tags`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req) => {
    try {
      const response = await https.post(`/api/v1/admin/tags`, req, {
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
      const response = await https.put(`/api/v1/admin/tags`, req, {
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
      const response = await https.delete(`/api/v1/admin/tags/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
