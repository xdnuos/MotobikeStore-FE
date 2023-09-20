import { https } from "./configAxios";

export let cartService = {
  getAllCart: async (userID) => {
    return await https.get(`/api/v1/user/${userID}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },

  addToCart: ({ userID, req }) => {
    return https.post(`/api/v1/user/${userID}/cart`, req, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  updateToCart: async ({ userID, req }) => {
    return await https.put(`/api/v1/user/${userID}/cart`, req, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  deleteToCart: async ({ userID, itemID }) => {
    return await https.delete(`/api/v1/user/${userID}/cart/${itemID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  // deleteAll: async (idAccount) => {
  //   try {
  //     const response = await https.delete( `/api/v1/api/carts/item/${idAccount}`,{
  //       ...getAuthConfig(),
  //       'Content-Type': 'multipart/form-data'
  //     })
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
