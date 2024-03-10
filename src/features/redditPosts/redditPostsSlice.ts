import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import he from 'he';

export interface RedditPostData {
  author: string;
  title: string;
  selftext: string;
  ups: number;
  num_comments: number;
  thumbnail: string;
  createdUtc: number;
}

export interface RedditPostsState {
  posts: RedditPostData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RedditPostsState = {
  posts: [],
  status: "idle",
  error: null,
};


export const mapPosts = (json: any) => {
  return json.data.children.map((child: any) => ({
    author: child.data.author,
    title: child.data.title,
    selftext: child.data.selftext,
    ups: child.data.ups,
    num_comments: child.data.num_comments,
    thumbnail: he.decode(child.data.thumbnail),
    createdUtc: child.data.created_utc,
  }));
};

// async thunk action for fetching Reddit posts
export const fetchRedditPosts = createAsyncThunk(
  "redditPosts/fetchPosts",
  async (subReddit: string) => {
    try {
      const respond = await fetch(`https://www.reddit.com/r/${subReddit}.json`);
      const json = await respond.json();

      return mapPosts(json);
    } catch (error) {
      console.error("Error fetching Reddit posts:", error);
    }
  },
);

const redditPostsSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRedditPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default redditPostsSlice.reducer;
