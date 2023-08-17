import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services/categoryService";

const initialState = {
  allCategories: [],
  loading: false,
};

export const getAllCategories = createAsyncThunk("category/list", async () => {
  const response = await categoryService.getAllCategories();
  return response.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        allCategories: [],
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getAllCategories.pending, (state) => {
        return {
          ...state,
          allCategories: [],
          loading: true,
        };
      })
      .addCase(getAllCategories.fulfilled, (state, actions) => {
        return {
          ...state,
          allCategories: actions.payload,
          loading: false,
        };
      })
      .addCase(getAllCategories.rejected, (state) => {
        return {
          ...state,
          allCategories: [],
          loading: false,
        };
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
