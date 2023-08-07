import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { productService } from "../../services/productService";


const initialState = {
    product: null,
    loading: false,
    error: null,
  };
  
  export const getProductById = createAsyncThunk(
    'product/getById',
    async (id) => {
      const response = await productService.getProductById(id);
      return response;
    }
  );
  
  const productDetailSlice = createSlice({
    name: 'product/detail',
    initialState,
    reducers: {
      reset: (state) => {
        return {
          ...state,
          product: null,
          error: null,
        };
      },
    },
    extraReducers: (builder) => {
      return builder
        .addCase(getProductById.pending, (state) => {
          return {
            ...state,
            product: null,
            loading: true,
            error: null,
          };
        })
        .addCase(getProductById.fulfilled, (state, action) => {
          return {
            ...state,
            product: action.payload,
            loading: false,
            error: null,
          };
        })
        .addCase(getProductById.rejected, (state, action) => {
          return {
            ...state,
            product: null,
            loading: false,
            error: action.error.message,
          };
        });
    },
  });
  
  export const { reset } = productDetailSlice.actions;
  export default productDetailSlice.reducer;
  