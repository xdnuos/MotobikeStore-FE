import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services/categoryService";
import { message } from "antd";

const initialState = {
  allCategories: [],
  loading: false,
};

export const getAllCategories = createAsyncThunk("category/list", async () => {
  const response = await categoryService.getAllCategories();
  return response.data;
});
export const createCategory = createAsyncThunk(
  "category/create",
  async (request) => {
    try {
      const response = await categoryService.create(request);
      message.success(response.data.message);
      return response.data.categories;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async (request) => {
    try {
      const response = await categoryService.update(request);
      message.success(response.data.message);
      return response.data.categories;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryID) => {
    try {
      const response = await categoryService.delete(categoryID);
      message.success(response.data.message);
      return response.data.categories;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
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
      })
      .addCase(createCategory.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createCategory.fulfilled, (state, actions) => {
        return {
          ...state,
          allCategories: actions.payload,
          loading: false,
        };
      })
      .addCase(createCategory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateCategory.fulfilled, (state, actions) => {
        return {
          ...state,
          allCategories: actions.payload,
          loading: false,
        };
      })
      .addCase(updateCategory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteCategory.fulfilled, (state, actions) => {
        return {
          ...state,
          allCategories: actions.payload,
          loading: false,
        };
      })
      .addCase(deleteCategory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
