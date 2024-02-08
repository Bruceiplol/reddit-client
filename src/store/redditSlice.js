import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const api_root = "https://www.reddit.com";

export const fetchRedditData = createAsyncThunk(
  "redditData/fetchRedditData",
  async (selectedSubreddit) => {
    const res = await fetch(
      `${api_root}${selectedSubreddit ? selectedSubreddit : "/r/popular"}.json`
    );
    const data = await res.json();

    return data.data.children.map((post) => ({
      id: post.data.id,
      ups: post.data.ups,
      title: post.data.title,
      url: post.data.url,
      author: post.data.author,
      created: post.data.created,
      num_comments: post.data.num_comments,
      permalink: post.data.permalink,
      toggleComments: false,
      comments: [],
    }));
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
  searchTerm: "",
  selectedSubreddit: "",
};

const redditSlice = createSlice({
  name: "redditPost",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = ''
    },
    toggleComments: (state, action) => {
      const {index} = action.payload
      state.data[index].toggleComments = !state.data[index].toggleComments
    },
    setPostComments: (state, action) => {
      const {comments, index} = action.payload
      state.data[index].comments = comments
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRedditData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchRedditData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPosts, setSearchTerm, setSelectedSubreddit, setPostComments, toggleComments } =
  redditSlice.actions;

export default redditSlice.reducer;

const selectPosts = (state) => state.reddit.data;
const searchTerm = (state) => state.reddit.searchTerm;
export const selectFilteredPosts = createSelector(
  [selectPosts, searchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);