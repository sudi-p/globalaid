import React, { useState, lazy, ReactNode, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@lib/api";
import PageNotFound from "./404";
import NavbarLayout from "@components/layout/navBarLayout";
import { Skeleton } from "@mui/material";
import { IndividualChatSkeleton } from "../components/chat/IndividualChat";
import NoChats from "@src/components/chat/EmptyChat";
import ChatList from "@src/components/chat/ChatList";
const IndividualChat = lazy(() => import("../components/chat/IndividualChat"));

export default function Chats() {
  const [chatId, setChatId] = useState("");
  const {
    isLoading,
    error,
    data: chats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/user/getchats");
      return res.data;
    },
  });
  useEffect(() => {
    if (chats && chats.length > 0 && !chatId) {
      setChatId(chats[0].chatId);
    }
  }, [chats, chatId]);
  if (isLoading) return <ChatSkeleton />;
  if (error) return <PageNotFound />;
  if (!chats.length) return <NoChats />;
  return <ChatList chatId={chatId} setChatId={setChatId} chats={chats} />;
}

Chats.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

const ChatSkeleton = () => {
  return (
    <div className="flex gap-4 p-7 m-auto">
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center border w-full sm:w-96 border-solid border-gray-300 rounded-lg mb-3 p-4"
          >
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              className="mr-4"
            />
            <div className="flex-1">
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="50%" height={20} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <div className="border border-solid flex flex-col border-gray-200 rounded-lg h-[calc(100vh-5rem)] shadow-md">
          <div className="p-4 border-0 border-b border-solid border-gray-300 flex flex-col items-center bg-gray-100">
            <Skeleton variant="text" width={200} height={30} />
            <Skeleton variant="text" width={150} height={20} className="my-2" />
          </div>
          <div className="p-4 overflow-y-scroll bg-white flex-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={50}
                className="my-2"
              />
            ))}
          </div>
          <div className="w-full p-4 flex gap-2 items-center bg-gray-100">
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
