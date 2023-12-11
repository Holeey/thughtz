import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService.js";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  editingPost: null
};
export const getPosts = createAsyncThunk("posts/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await postService.getPosts(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePost = createAsyncThunk(
    "posts/update",
    async (payload, thunkAPI) => {
         const {id, updatedPost} = payload
        try {
          const token = thunkAPI.getState().auth.user.token;
          return await postService.updatePost(id, updatedPost, token);
        } catch (error) {
          const message =
            (error.response && error.response.data && error.response.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
        }
      }
)

export const deletePost = createAsyncThunk(
    "posts/delete",
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletePost(id, token);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => state.initialState,
    editPost: (state, action) => {
        state.editingPost = action.payload;
      },
    resetEditingPost: (state) => {
        state.editingPost = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Find the index of the post to update
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
        // Update the post in the array
        state.posts[index] = action.payload 
       }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(post => post._id !== action.payload.id)
        })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, editPost, resetEditingPost } = postSlice.actions;
export default postSlice.reducer;
