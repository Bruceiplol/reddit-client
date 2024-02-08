import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const api_root = "https://www.reddit.com";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({permalink, index}) => {
    const res = await fetch(`${api_root}${permalink}.json`);
    const data = await res.json();
    
    const comments = data[1].data.children.map((comment) => comment.data)
    return {comments, index}
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;