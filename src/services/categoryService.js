import { https } from "./configAxios";

export let categoryService = {
  getAllCategories: async () => {
    try {
      const response = await https.get(`/api/v1/categories`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req) => {
    try {
      const response = await https.post(`/api/v1/admin/categories`, req);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (req) => {
    try {
      const response = await https.put(`/api/v1/admin/categories`, req);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await https.delete(`/api/v1/admin/categories/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // getSubcategories: async (id) => {
  //   try {
  //     const response = await https.get(
  //        `/api/v1/categories/${id}/subcategories`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  // getProductByCategory: async (id) => {
  //   try {
  //     const response = await https.get(
  //        `/api/v1/categories/${id}/products`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  // login: async (values) => {
  //   try {
  //       const response = await https.post( "/api/v1/auth/login", values);
  //       message.success("Login Success")
  //       return response.data
  //   } catch (error) {
  //     message.error("Register Error")
  //     console.log(error)
  // }
  // },
};
