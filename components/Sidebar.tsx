import React from "react";
import {
  BookmarkIcon,
  BellIcon,
  HashtagIcon,
  UserIcon,
  HomeIcon,
  DocumentPlusIcon,
  DocumentIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import SideBarRow from "./SidebarRow";
import { useSession, signIn, signOut } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnavb-eUkgBvnPOWfIVAMuh539a4T7GWZ974XlY0eqjij4ZD7WQi0Yqq0Et22JEhiGzJs&usqp=CAU"
        alt=""
      />
      <SideBarRow Icon={HomeIcon} title="Home" />
      <SideBarRow Icon={HashtagIcon} title="Explore" />
      <SideBarRow Icon={BellIcon} title="Notification" />
      <SideBarRow Icon={DocumentPlusIcon} title="Messages" />
      <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SideBarRow Icon={DocumentIcon} title="List" />

      <SideBarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />
      <SideBarRow Icon={PhoneIcon} title="More" />
    </div>
  );
}

export default Sidebar;
