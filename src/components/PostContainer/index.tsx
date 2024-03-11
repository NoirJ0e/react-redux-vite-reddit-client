import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRedditPosts,
  mapPosts,
  RedditPostData,
} from "../../features/redditPosts/redditPostsSlice";
import Post from "../Posts";
import { AppDispatch, RootState } from "../../app/store";

// CSS helper
import mockResponse from "../../mockData/mock-data";

function PostContainer({ subreddit = "popular" }) {
  const dispatch: AppDispatch = useDispatch();
  const { posts, status } = useSelector((state: RootState) =>
    state.redditPosts
  );
  useEffect(() => {
    dispatch(fetchRedditPosts(subreddit));
  }, [dispatch, subreddit]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load posts</div>;
  }

  // const posts = mapPosts(mockResponse);

  return (
    <div>
      {posts.map((post: RedditPostData, id: number) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
}

export default PostContainer;
