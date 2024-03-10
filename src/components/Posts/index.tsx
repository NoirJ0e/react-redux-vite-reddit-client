import React from "react";
import { RedditPostData } from "../../features/redditPosts/redditPostsSlice";

function Posts(props: RedditPostData) {
  const { author, title, selftext, ups, num_comments, thumbnail, createdUtc } =
    props;
  return (
    <div>
      <h3>{title}</h3>
      <p>{selftext}</p>
      <p>{num_comments}</p>
      <p>{author}</p>
      <p>{ups}</p>
      <p>{createdUtc}</p>
      <img src={thumbnail} />
    </div>
  );
}

export default Posts;
