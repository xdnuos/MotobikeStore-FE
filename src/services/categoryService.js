import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/categories`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/admin/categories`,
        req,
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
  update: async (req) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/categories`,
        req,
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
        BASE_URL + `/api/v1/admin/categories/${id}`,
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
  // getSubcategories: async (id) => {
  //   try {
  //     const response = await axios.get(
  //       BASE_URL + `/api/v1/categories/${id}/subcategories`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  // getProductByCategory: async (id) => {
  //   try {
  //     const response = await axios.get(
  //       BASE_URL + `/api/v1/categories/${id}/products`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  // login: async (values) => {
  //   try {
  //       const response = await axios.post(BASE_URL + "/api/v1/auth/login", values);
  //       message.success("Login Success")
  //       return response.data
  //   } catch (error) {
  //     message.error("Register Error")
  //     console.log(error)
  // }
  // },
};
