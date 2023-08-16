import axios from "axios";
import { BASE_URL, getAuthConfig } from "../utils/baseURL";
import { message } from "antd";

export let cartService = {
  getAllCart: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/carts/get/${userID}`
        // ,{
        //   ...getAuthConfig(),
        // }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  addToCart: async (AddToCartRequest) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/carts/add`,
        AddToCartRequest
        // {
        //   ...getAuthConfig(),
        // }
      );
      message.success(response.data.message);
      console.log(response);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
      console.log(error);
    }
  },
  updateToCart: async (UpdateCartItemRequest) => {
    try {
      console.log("updateCarrt", UpdateCartItemRequest);
      const response = await axios.put(
        BASE_URL + `/api/v1/carts/edit`,
        UpdateCartItemRequest
      );
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteToCart: async (request) => {
    console.log("xoa cart ne", request);
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/carts/delete`,
        request
      );
      console.log(response);
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  // deleteAll: async (idAccount) => {
  //   try {
  //     const response = await axios.delete(BASE_URL + `/api/v1/api/carts/item/${idAccount}`,{
  //       ...getAuthConfig(),
  //       'Content-Type': 'multipart/form-data'
  //     })
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
