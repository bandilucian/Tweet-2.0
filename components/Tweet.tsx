import React, { useEffect, useState } from "react";
import { Comment, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  SwatchIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    
  };
  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.image}
          alt="profileImage"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              {tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>
          </div>
          <TimeAgo className="text-sm text-gray-500" date={tweet._createdAt} />
        </div>
        <div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwatchIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpIcon className="h-5 w-5" />
        </div>
      </div>
      {/* {Comment box logic} */}
      {commentBoxVisible && (
        <form onClick={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment"
          />
          <button
            type="submit"
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                alt=""
                className=" mt-2 h-7 w-7 object-cover rounded-full"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    {comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
