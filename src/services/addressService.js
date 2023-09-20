import { message } from "antd";
import { https } from "./configAxios";

export let addressService = {
  getAddress: async (userID) => {
    try {
      const response = await https.get(`/api/v1/user/${userID}/address`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addAddress: async ({ userID, req }) => {
    try {
      const response = await https.post(`/api/v1/user/${userID}/address`, req);
      message.success("Address added successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  editAddress: async ({ userID, req }) => {
    try {
      const response = await https.put(`/api/v1/user/${userID}/address`, req);
      message.success("Success");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteAddress: async ({ userID, addressID }) => {
    try {
      const response = await https.delete(
        `/api/v1/user/${userID}/address/${addressID}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
      throw error;
    }
  },
  getDefaultAddress: async ({ userID }) => {
    try {
      const response = await https.get(
        `/api/v1/user/${userID}/address/default`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  setDefaultAddress: async ({ userID, addressID }) => {
    try {
      const response = await https.put(
        `/api/v1/user/${userID}/address/default/${addressID}`,
        {}
      );
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAddressByID: async ({ userID, addressID }) => {
    try {
      const response = await https.get(
        `/api/v1/user/${userID}/address/${addressID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
