import { configureStore } from "@reduxjs/toolkit";
import redditPostsSlice from "../features/redditPosts/redditPostsSlice";

export const store = configureStore({
  reducer: {
    redditPosts: redditPostsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
