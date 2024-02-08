import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api_root = "https://www.reddit.com";

export const fetchSubredditData = createAsyncThunk(
  "subreddit/fetchSubreddit",
  async () => {
    const res = await fetch(`${api_root}/subreddits.json`);
    const data = await res.json();
    
    return data.data.children.map((subreddit) => ({
      id: subreddit.data.id,
      icon_image: subreddit.data.icon_img,
      display_name: subreddit.data.display_name_prefixed,
      url: subreddit.data.url,
    }));
  }
);

const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubredditData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSubredditData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subredditSlice.reducer;
