import axios from "axios";
import { https } from "./configAxios";
import { BASE_URL } from "../utils/baseURL";

export let productService = {
  getAllProduct: async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/v1/products/get");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/products/get/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUnitsByIdProduct: async (id) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/products/${id}/units`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  create: async (values) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/products/add`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (values) => {
    try {
      const response = await https.delete(`/api/v1/products/delete`, values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};
