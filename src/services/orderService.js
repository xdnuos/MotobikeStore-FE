import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let orderService = {
  createOrder: async (AddToCartRequest) => {
    try {
      console.log(AddToCartRequest);
      const response = await axios.post(
        BASE_URL + `/api/v1/order/add/admin`,
        AddToCartRequest
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrders: async (customerID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/order/get/${customerID}`
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllOrdersAdmin: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/order/get/admin`);
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrdersByStaff: async (staffID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/order/get/admin/${staffID}`
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrdersID: async (orderID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/order/get/orderDetail/${orderID}`
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOrdersByCustomer: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/order/get/${userID}`
      );
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  confirmOrder: async (confirmOrderRequest) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/order/edit/admin/confirmOrder`,
        confirmOrderRequest
      );
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createOrderByCustomer: async (request) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/order/add`,
        request,
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
  getOrderByCustomer: async (idUser) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/order/get/${idUser}`,
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
  }
};
