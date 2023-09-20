import { message } from "antd";
import { https } from "./configAxios";

export let orderService = {
  createOrderAdmin: async ({ userID, req }) => {
    try {
      const response = await https.post(
        `/api/v1/admin/user/${userID}/orders`,
        req
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
      const response = await https.get(`/api/v1/admin/orders`, {
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
      const response = await https.get(`/api/v1/admin/user/${userID}/orders`);
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrderDetailAdmin: async (orderID) => {
    try {
      const response = await https.get(`/api/v1/admin/orders/${orderID}`);
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  confirmOrder: async ({ userID, orderID }) => {
    try {
      const response = await https.put(
        `/api/v1/admin/user/${userID}/orders/${orderID}/confirm`,
        {}
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
      const response = await https.put(
        `/api/v1/admin/user/${userID}/orders/${orderID}/shipping`,
        {}
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
      const response = await https.put(
        `/api/v1/admin/user/${userID}/orders/${orderID}/success`,
        {}
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
      const response = await https.put(
        `/api/v1/admin/user/${userID}/orders/${orderID}/cancel`,
        {}
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
      const response = await https.post(`/api/v1/user/${userID}/orders`, req);
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
      const response = await https.get(`/api/v1/user/${userID}/orders`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancelForCustomer: async ({ userID, orderID }) => {
    try {
      const response = await https.delete(
        `/api/v1/user/${userID}/orders/${orderID}`
      );
      console.log("Response: ", response);
      message.success(response.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  buyAgainForCustomer: async ({ userID, orderID }) => {
    try {
      const response = await https.post(
        `/api/v1/user/${userID}/orders/${orderID}/buyAgain`,
        {}
      );
      console.log("Response: ", response);
      message.success(response.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
