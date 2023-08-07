import axios from "axios";
import { BASE_URL, getAuthConfig } from "../utils/baseURL";
// import { openNotificationIcon } from "../Components/NotificationIcon/NotificationIcon";


export let cartService = {
  getAllCart: async (idAccount) => { 
    try {
      const response = await axios.get(BASE_URL + `/api/v1/customers/${idAccount}/carts`
      // ,{
      //   ...getAuthConfig(),
      // }
      );
      return response.data
  } catch (error) {
      console.log(error);      
  }
  },

  addToCart: async (AddToCartRequest) => {
    try {
      const response = await axios.post(BASE_URL + `/api/v1/carts/add-item`,AddToCartRequest
      // {
      //   ...getAuthConfig(),
      // }
      );
      // openNotificationIcon('success', 'Success', 'Add Product Success!');
      console.log(response);
      return response.data
    } catch (error) {
      // openNotificatio nIcon('error', 'Error', 'Failed to add product to cart!');
      console.log(error);
    }
  },
  updateToCart: async (UpdateCartItemRequest) => {
    try {
      const response = await axios.put(BASE_URL + `/api/v1/carts/update-item`,UpdateCartItemRequest 
      //, {
      //   ...getAuthConfig(),
      // }
      )
      console.log(response);
      return response.data
    } catch (error) {
      console.log(error);
    }
  },
  deleteToCart: async (idCartItem) => {
    try {
      const response = await axios.delete(BASE_URL + `/api/v1/carts/${idCartItem}`,
      // {
      //   ...getAuthConfig(),
      // }
      );
      console.log(response);
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
