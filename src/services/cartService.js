import axios from "axios";
import { BASE_URL, getAuthConfig } from "../utils/baseURL";

export let cartService = {
  getAllCart: async (userID) => {
    return await axios.get(BASE_URL + `/api/v1/carts/get/${userID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },

  addToCart: (AddToCartRequest) => {
    return axios.post(BASE_URL + `/api/v1/carts/add`, AddToCartRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  updateToCart: async (UpdateCartItemRequest) => {
    // console.log("updateCarrt", UpdateCartItemRequest);
    return await axios.put(
      BASE_URL + `/api/v1/carts/edit`,
      UpdateCartItemRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  },
  deleteToCart: async (value) => {
    return await axios.put(BASE_URL + `/api/v1/carts/delete`, value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
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
