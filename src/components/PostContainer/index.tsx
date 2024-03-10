import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRedditPosts,
  RedditPostData,
} from "../../features/redditPosts/redditPostsSlice";
import Post from "../Posts";
import { RootState, AppDispatch } from "../../app/store";

// CSS helper
import mockResponse from "../../mockData/mock-data";
import he from 'he';


// CSS helper
const transformMockData = (mockResponse: any): RedditPostData[] => {
  return mockResponse.data.children.map((child: any) => ({
    author: child.data.author,
    title: child.data.title,
    selftext: child.data.selftext,
    ups: child.data.ups,
    num_comments: child.data.num_comments,
    thumbnail: he.decode(child.data.thumbnail),
    createdUtc: child.data.created_utc,
  }));
};


function PostContainer({ subreddit = "popular" }) {
  // const dispatch: AppDispatch = useDispatch();
  // const {posts, status} = useSelector((state: RootState) => state.redditPosts);
  // useEffect(() => {
  //   dispatch(fetchRedditPosts(subreddit));
  // }, [dispatch, subreddit]);
  //
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }
  //
  // if (status === 'failed') {
  //   return <div>Failed to load posts</div>;
  // }
  const posts = transformMockData(mockResponse);

  return (
    <div>
      {posts.map((post: RedditPostData, id: number) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
}

export default PostContainer;
