import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let orderService = {
  createOrder: async (AddToCartRequest) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/order/create`,
        AddToCartRequest
        //   {
        //     ...getAuthConfig(),
        //   }
      );
      // openNotificationIcon('success', 'Success', 'Add Product Success!');
      console.log(response);
      return response.data;
    } catch (error) {
      // openNotificatio nIcon('error', 'Error', 'Failed to add product to cart!');
      console.log(error);
    }
  },
};
