import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import subredditReducer from "./subredditSlice"
import commentsReducer from "./commentsSlice"

const store = configureStore({
  reducer: combineReducers({
    reddit: redditReducer,
    subreddit: subredditReducer,
    comments: commentsReducer
  }),
});

export default store;
