import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let addressService = {
  addAddress: async ({ userID, req }) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/user/${userID}/address`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      message.success("Address added successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAddress: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/user/${userID}/address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteAddress: async ({ userID, addressID }) => {
    try {
      const response = await axios.delete(
        BASE_URL + `/api/v1/user/${userID}/address/${addressID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
