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

  addToCart: (AddToCartRequest) => {
    return axios.post(
        BASE_URL + `/api/v1/carts/add`,
        AddToCartRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  },
  updateToCart: async (UpdateCartItemRequest) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/carts/edit`,
        UpdateCartItemRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteToCart: async (idCartItem) => {
      return await axios.delete(
        BASE_URL + `/api/v1/carts/delete/${idCartItem}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      
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
