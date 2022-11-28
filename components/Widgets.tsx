import React from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import {TwitterTimelineEmbed} from "react-twitter-embed";
function Widgets() {
  return (
    <div className="col-span-2 px-2 mt-2 hidden lg:inline">
      {/* {Search} */}
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
        <WalletIcon className="h5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className=" flex-1 bg-transparent outline-none"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="saurabhnemade"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
