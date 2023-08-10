import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let orderService = {
  createOrder: async (AddToCartRequest) => {
    try {
      console.log(AddToCartRequest);
      const response = await axios.post(
        BASE_URL + `/api/v1/order/add`,
        AddToCartRequest
        //   {
        //     ...getAuthConfig(),
        //   }
      );
      // openNotificationIcon('success', 'Success', 'Add Product Success!');
      console.log("Response: ", response);
      return response;
    } catch (error) {
      // openNotificatio nIcon('error', 'Error', 'Failed to add product to cart!');
      console.log(error);
      throw error;
    }
  },
};
