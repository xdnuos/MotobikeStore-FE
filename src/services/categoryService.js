import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/categories/get`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  create: async (request) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/categories/add`,
        request
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (request) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/categories/edit`,
        request
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
        BASE_URL + `/api/v1/categories/delete/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getSubcategories: async (id) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/categories/${id}/subcategories`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProductByCategory: async (id) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/categories/${id}/products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
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
