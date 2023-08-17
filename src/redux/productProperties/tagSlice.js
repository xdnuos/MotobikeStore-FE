import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tagService } from "../../services/tagService";

const initialState = {
  allTags: [],
  loading: false,
};

export const getAllTags = createAsyncThunk("tag/list", async () => {
  const response = await tagService.getAllTags();
  return response.data;
});

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        allTags: [],
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getAllTags.pending, (state) => {
        return {
          ...state,
          allTags: [],
          loading: true,
        };
      })
      .addCase(getAllTags.fulfilled, (state, actions) => {
        return {
          ...state,
          allTags: actions.payload,
          loading: false,
        };
      })
      .addCase(getAllTags.rejected, (state) => {
        return {
          ...state,
          allTags: [],
          loading: false,
        };
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
