import axios from "axios";
import { https } from "./configAxios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let productService = {
  getAllProduct: async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/v1/products/get");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllProductAdmin: async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/v1/products/get/admin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
      return await axios.post(BASE_URL + `/api/v1/products/add`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  update: async ({ formData, id }) => {
    try {
      return await axios.put(
        BASE_URL + `/api/v1/products/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      throw error;
    }
  },
  // delete: async (values) => {
  //   try {
  //     const response = await https.delete(`/api/v1/products/delete`, values);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // stockProduct: async (values) => {
  //   try {
  //     const response = await https.delete(`/api/v1/products/delete`, values);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  changeState: async (values) => {
    try {
      return await https.put(`/api/v1/products/changeState/${values}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  changeStateMulti: async (values) => {
    try {
      const response = await https.put(
        `/api/v1/products/changeStateMulti/${values}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
