import { Badge } from "@mui/material";
import React from "react";
import { FaComments } from "react-icons/fa";
import { MdChatBubbleOutline } from "react-icons/md";

const NoChats = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32 w-full bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white shadow-md border border-solid border-gray-300 rounded-lg">
        <Badge badgeContent={"0"} color="primary">
          <MdChatBubbleOutline className="text-gray-400 text-6xl mb-4" />
        </Badge>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          No Chats Available
        </h2>
        <p className="text-2xl text-gray-500 mb-4 text-center">
          You don't have any conversations yet.
          <br /> You can message the ad owner from the ad page.
        </p>
      </div>
    </div>
  );
};

export default NoChats;
