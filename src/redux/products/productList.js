import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";
import { stockService } from "src/services/stockService";
import { message } from "antd";
/** State **/
const initialState = {
  allProduct: [],
  loading: true,
  error: null,
};
export const getAllProduct = createAsyncThunk("product/list", async () => {
  const response = await productService.getAllProduct();
  return response;
});
export const getAllProductAdmin = createAsyncThunk(
  "product/listAdmin",
  async () => {
    try {
      const response = await productService.getAllProductAdmin();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (req) => {
    try {
      const response = await productService.create(req);
      message.success(response.data.message);
      return response.data.product;
    } catch (error) {
      throw error;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ req, id }) => {
    try {
      const response = await productService.update({ req, id });
      message.success(response.data.message);
      return response.data.product;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const creatStockProduct = createAsyncThunk(
  "product/creatStockProduct",
  async (req) => {
    try {
      const response = await stockService.create(req);
      console.log(response);
      message.success(response.data);
      return response.data.product;
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
export const changeState = createAsyncThunk(
  "product/changeState",
  async (productID) => {
    try {
      const response = await productService.changeState(productID);
      console.log(response);
      message.success(response.data.message);
      return response.data.product;
    } catch (error) {
      throw new Error(error);
    }
  }
);
// Chua lam
export const changeStateMulti = createAsyncThunk(
  "product/changeStateMulti",
  async (productIDs) => {
    try {
      const response = await productService.changeStateMulti(productIDs);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);
const listProductSlice = createSlice({
  name: "product/list",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("reset");
      return {
        ...state,
        allProduct: [],
      };
    },
  },

  extraReducers: (builder) => {
    return builder
      .addCase(getAllProduct.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(getAllProduct.rejected, (state) => {
        return { ...state, allProduct: null, loading: false };
      })
      .addCase(getAllProductAdmin.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(getAllProductAdmin.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(getAllProductAdmin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(changeState.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(changeState.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(changeState.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(creatStockProduct.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(creatStockProduct.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(creatStockProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(changeStateMulti.pending, (state) => {
        state.allProduct = [];
        state.loading = true;
      })
      .addCase(changeStateMulti.fulfilled, (state, actions) => {
        state.allProduct = actions.payload;
        state.loading = false;
      })
      .addCase(changeStateMulti.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = listProductSlice.actions;
export default listProductSlice.reducer;
