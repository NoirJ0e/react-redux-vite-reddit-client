import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import he from "he";

export interface RedditPostData {
  id: string;
  url: string;
  author: string;
  title: string;
  selftext: string;
  ups: number;
  num_comments: number;
  thumbnail: string;
  createdUtc: number;
  permaLink: string;
  isMediaDomain: boolean;
  isVideo: boolean;
  videoUrl: string;
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
    id: child.data.id,
    url: child.data.url,
    author: child.data.author,
    title: child.data.title,
    selftext: child.data.selftext,
    ups: child.data.ups,
    num_comments: child.data.num_comments,
    thumbnail: he.decode(child.data.thumbnail),
    createdUtc: child.data.created_utc,
    permaLink: `https://www.reddit.com${child.data.permalink}`,
    isMediaDomain: child.data.is_reddit_media_domain,
    isVideo: child.data.is_video,
    videoUrl: child.data.media?.reddit_video?.fallback_url || "",
  }));
};

// async thunk action for fetching Reddit posts
export const fetchRedditPosts = createAsyncThunk(
  "redditPosts/fetchPosts",
  async ({ subReddit, page }: { subReddit: string; page: number }) => {
    try {
      const respond = await fetch(
        `https://www.reddit.com/r/${subReddit}.json?&limit=${page * 10 - 2}`,
      );
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
        // state.posts = [...state.posts, ...action.payload];
        if (action.payload.page === 1) {
          state.posts = action.payload;
        } else {
          const newPosts = action.payload.filter(
            (post: any) =>
              !state.posts.some((existingPost) => existingPost.id === post.id),
          );
          state.posts = [...state.posts, ...newPosts];
        }
      })
      .addCase(fetchRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectPosts = (state) => state.redditPosts.posts;
export const selectStatus = (state) => state.redditPosts.status;

export default redditPostsSlice.reducer;
