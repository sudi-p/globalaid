import React from "react";
import { FaComments } from "react-icons/fa";
import { MdChatBubbleOutline } from "react-icons/md";

const NoChats = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white shadow-md border border-solid border-gray-300 rounded-lg">
        <MdChatBubbleOutline className="text-gray-400 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Chats Available
        </h2>
        <p className="text-gray-500 mb-4">
          You don't have any conversations yet. You can message the ad owner
          from the ad page.
        </p>
        <FaComments className="text-blue-500 text-5xl" />
      </div>
    </div>
  );
};

export default NoChats;
