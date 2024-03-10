// import { screen, waitFor } from "@testing-library/react"
// import App from "./App"
import mockResponse from "./mockData/mock-data";

// ChatGPT4
import { configureStore } from "@reduxjs/toolkit";
import redditPostsReducer, {
  fetchRedditPosts,
  mapPosts,
} from "./features/redditPosts/redditPostsSlice";
import { RedditPostsState } from "./features/redditPosts/redditPostsSlice";
import { AppDispatch, RootState } from "./app/store";
describe("fetchRedditPosts thunk", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        redditPosts: redditPostsReducer,
      },
    });
  });
  describe("mapPosts function", () => {
    it("should map posts correctly", () => {
      const results = mapPosts(mockResponse);
      expect(results[0]).toHaveProperty("author");
      expect(results[0]).toHaveProperty("title");
      expect(results[0]).toHaveProperty("selftext");
      expect(results[0]).toHaveProperty("ups");
      expect(results[0]).toHaveProperty("num_comments");
      expect(results[0]).toHaveProperty("thumbnail");
    });
  });
  // Real test
  it("should fetch posts and update state on fulfilled", async () => {
    const subreddit = "popular"; // Example subreddit

    // Correctly type dispatch and getState
    const result = await (store.dispatch as AppDispatch)(
      fetchRedditPosts(subreddit),
    );
    const state: RedditPostsState = (store.getState() as RootState).redditPosts;
    console.log(state);

    // Assertions remain the same
    expect(state.status).toEqual("succeeded");
    expect(state.posts).not.toHaveLength(0);
    expect(state.error).toBeNull();
    expect(state.posts[0]).toHaveProperty("author");
    expect(state.posts[0]).toHaveProperty("title");
    expect(state.posts[0]).toHaveProperty("selftext");
    expect(state.posts[0]).toHaveProperty("ups");
    expect(state.posts[0]).toHaveProperty("num_comments");
    expect(state.posts[0]).toHaveProperty("thumbnail");
  });
});
