import axios from "axios";
import { BASE_URL, getAuthConfig } from "../utils/baseURL";

export let cartService = {
  getAllCart: async (userID) => {
    return await axios.get(BASE_URL + `/api/v1/user/${userID}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },

  addToCart: ({ userID, req }) => {
    return axios.post(BASE_URL + `/api/v1/user/${userID}/cart`, req, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  updateToCart: async ({ userID, req }) => {
    return await axios.put(BASE_URL + `/api/v1/user/${userID}/cart`, req, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  deleteToCart: async ({ userID, itemID }) => {
    return await axios.delete(
      BASE_URL + `/api/v1/user/${userID}/cart/${itemID}`,
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
