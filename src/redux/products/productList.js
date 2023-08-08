import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";
/** State **/
const initialState = {
  allProduct: [],
  loading: false,
  error: null,
  getProducts: false,
};
export const getAllProduct = createAsyncThunk("product/list", async () => {
  const response = await productService.getAllProduct();
  return response;
});
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (ProductForm) => {
    try {
      const response = await productService.create(ProductForm);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ formData, id }) => {
    try {
      const response = await productService.update({ formData, id });
      console.log(response);
      return response;
    } catch (error) {
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
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);
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
        getProducts: false,
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
        state.getProducts = false;
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
        state.getProducts = false;
      })
      .addCase(changeState.rejected, (state, { error }) => {
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
