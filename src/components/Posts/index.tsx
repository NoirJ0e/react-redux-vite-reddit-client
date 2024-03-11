import React from "react";
import { RedditPostData } from "../../features/redditPosts/redditPostsSlice";
import upArrowIcon from "./assets/up-arrow-svgrepo-com.svg";
import downArrowIcon from "./assets/down-arrow-svgrepo-com.svg";
import commentIcon from "./assets/comment-lines-svgrepo-com.svg";

function Posts(props: RedditPostData) {
  const {
    url,
    author,
    title,
    selftext,
    ups,
    num_comments,
    thumbnail,
    createdUtc,
    permaLink,
    isMediaDomain,
    isVideo,
    videoUrl,
  } = props;
  let imgSource;

  if (thumbnail === "self" || thumbnail === "default") {
    imgSource = null;
  } else {
    imgSource = isMediaDomain ? url : thumbnail;
  }

  return (
    <div className="bg-slate-100 shadow-md rounded-lg p-4 m-4 grid grid-cols-6 gap-4">
      <div className="flex flex-col items-center justify-center">
        <img className="max-w-8 mb-2" src={upArrowIcon} alt="up-arrow-icon" />
        <p>{ups}</p>
        <img
          className="max-w-8 mt-2"
          src={downArrowIcon}
          alt="down-arrow-icon"
        />
      </div>

      <div className="col-span-5">
        <h3 className="text-2xl font-semibold text-center ">
          <a href={permaLink}>{title}</a>
        </h3>
        <p className="text-gray mb-4">{selftext.substring(0, 100)}</p>
        {isVideo && videoUrl
          ? (
            <video controls>
              <source src={videoUrl} />
            </video>
          )
          : ""}
        {!isVideo && imgSource ? <img src={imgSource} alt="thumbnail" /> : ""}

        <div className="flex justify-between text-xs text-center">
          <div className="flex flex-col">
            <p>Posted by:</p>
            <p>{author}</p>
          </div>
          <div className="flex flex-col">
            <p>Posted on:</p>
            <p>{new Date(createdUtc * 1000).toLocaleDateString()}</p>
          </div>

          <div className="flex">
            <img className="max-w-8" src={commentIcon} alt="comment-icon" />
            <p className="text-sm my-auto">{num_comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
