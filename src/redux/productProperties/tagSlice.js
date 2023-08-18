import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tagService } from "../../services/tagService";
import { message } from "antd";

const initialState = {
  allTags: [],
  loading: false,
};

export const getAllTags = createAsyncThunk("tag/list", async () => {
  const response = await tagService.getAllTags();
  return response.data;
});
export const createTag = createAsyncThunk("tag/create", async (request) => {
  try {
    const response = await tagService.create(request);
    message.success(response.data.message);
    return response.data.tags;
  } catch (error) {
    message.error(error.response.data);
    throw new Error(error);
  }
});
export const updateTag = createAsyncThunk("tag/update", async (request) => {
  try {
    const response = await tagService.update(request);
    message.success(response.data.message);
    return response.data.tags;
  } catch (error) {
    message.error(error.response.data);
    throw new Error(error);
  }
});
export const deleteTag = createAsyncThunk("tag/delete", async (tagID) => {
  try {
    const response = await tagService.delete(tagID);
    message.success(response.data.message);
    return response.data.tags;
  } catch (error) {
    message.error(error.response.data);
    throw new Error(error);
  }
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
      })
      .addCase(createTag.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createTag.fulfilled, (state, actions) => {
        return {
          ...state,
          allTags: actions.payload,
          loading: false,
        };
      })
      .addCase(createTag.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateTag.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateTag.fulfilled, (state, actions) => {
        return {
          ...state,
          allTags: actions.payload,
          loading: false,
        };
      })
      .addCase(updateTag.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteTag.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteTag.fulfilled, (state, actions) => {
        return {
          ...state,
          allTags: actions.payload,
          loading: false,
        };
      })
      .addCase(deleteTag.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
