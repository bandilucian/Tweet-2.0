import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  CalendarIcon,
  LockOpenIcon,
  PhotoIcon,
  CircleStackIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    setImageUrlBoxOpen(false);
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });

    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast('Tweet Posted')

    return json;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postTweet();
    setInput('');
    setImage('');
    setImageUrlBoxOpen(false)
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt=""
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening??"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-centers">
            <div className="flex flex-1 space-x-2 text-twitter">
              {/* {Icon} */}
              <PhotoIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <HandRaisedIcon className="h-5 w-5" />
              <LockOpenIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <CircleStackIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Twett
            </button>
          </div>
          {imageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lf bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent outline-none p-2 text-white placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
