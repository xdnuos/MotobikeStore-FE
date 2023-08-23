import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let orderService = {
  createOrderAdmin: async ({ userID, req }) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/admin/user/${userID}/orders`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllOrdersAdmin: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrderByStaffUserIDAdmin: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/user/${userID}/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrderDetailAdmin: async (orderID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/orders/${orderID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  confirmOrder: async ({ userID, orderID }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/user/${userID}/orders/${orderID}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  shipping: async ({ userID, orderID }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/user/${userID}/orders/${orderID}/shipping`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  success: async ({ userID, orderID }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/user/${userID}/orders/${orderID}/success`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancel: async ({ userID, orderID }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/user/${userID}/orders/${orderID}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createOrderForCustomer: async ({ userID, req }) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/user/${userID}/orders`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Response: ", response);
      message.success("Đặt hàng thành công");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrdersForCustomer: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/user/${userID}/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
