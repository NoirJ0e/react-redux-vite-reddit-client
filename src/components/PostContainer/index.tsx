import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRedditPosts,
  RedditPostData,
  selectPosts,
  selectStatus,
} from "../../features/redditPosts/redditPostsSlice";
import Post from "../Posts";
import { AppDispatch, RootState } from "../../app/store";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLoader from "../PostLoader";

function PostContainer({ subreddit = "popular" }) {
  const dispatch: AppDispatch = useDispatch();
  // const { posts, status } = useSelector((state: RootState) =>
  //   state.redditPosts
  // );

  // InfiniteScroll
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const loadMore = () => {
    if (status !== "loading") {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchRedditPosts({ subReddit: 'popular', page }));
  }, [dispatch, subreddit, page]);

  useEffect(() => {
    if (status === "succeeded") {
      setHasMore(posts.length > 0);
    }
  }, [status, posts]);

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={status !== "idle"}
        loader={<PostLoader />}
      >
        {posts.map((post: RedditPostData) => (
          <Post key={post.id} {...post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostContainer;
