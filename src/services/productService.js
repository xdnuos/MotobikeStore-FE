import { message } from "antd";
import { https } from "./configAxios";

export let productService = {
  getAllProduct: async () => {
    const response = await https.get("/api/v1/products");
    return response.data;
  },
  getAllProductAdmin: async () => {
    const response = await https.get("/api/v1/admin/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
  getProductById: async (id) => {
    try {
      const response = await https.get(`/api/v1/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductByIdAdmin: async (id) => {
    try {
      const response = await https.get(`/api/v1/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  create: async (req) => {
    try {
      return await https.post(`/api/v1/admin/products`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  update: async ({ req, id }) => {
    try {
      return await https.put(`/api/v1/admin/products/${id}`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      throw error;
    }
  },
  // delete: async (values) => {
  //   try {
  //     const response = await https.delete(`/api/v1/products/delete`, values);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // stockProduct: async (values) => {
  //   try {
  //     const response = await https.delete(`/api/v1/products/delete`, values);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  changeState: async (id) => {
    try {
      return await https.put(`/api/v1/admin/products/${id}/changeState`, {});
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  // changeStateMulti: async (values) => {
  //   try {
  //     const response = await https.put(
  //       `/api/v1/products/changeStateMulti/${values}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  addReview: async ({ productID, req }) => {
    try {
      return await https.post(`/api/v1/admin/products/${productID}/review`, {
        req,
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  getReview: async (productID) => {
    try {
      return await https.post(`/api/v1/admin/products/${productID}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
};
