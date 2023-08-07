import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "src/services/productService";

const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (AddProductRequest) => {
    try {
      const response = await productService.create(AddProductRequest);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const productActionSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = productActionSlice.actions;
export default productActionSlice.reducer;
