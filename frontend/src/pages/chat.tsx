import React, { useState, lazy, ReactNode, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@lib/api";
import PageNotFound from "./404";
import NavbarLayout from "@components/layout/navBarLayout";
import { Skeleton } from "@mui/material";
import { IndividualChatSkeleton } from "../components/chat/IndividualChat";
const IndividualChat = lazy(() => import("../components/chat/IndividualChat"));

export default function Chats() {
  const [chatId, setChatId] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/user/getchats");
      return res.data;
    },
  });
  useEffect(() => {
    if (data && data.length > 0 && !chatId) {
      setChatId(data[0].chatId);
    }
  }, [data, chatId]);
  if (isLoading)
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
              <Skeleton
                variant="text"
                width={150}
                height={20}
                className="my-2"
              />
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
  if (error) return <PageNotFound />;
  return (
    <div className="flex gap-4 p-7 m-auto">
      <div>
        {data &&
          data.map((chat: ChatProps) => (
            <ChatListItem
              chat={chat}
              key={chat.chatId}
              setChatId={setChatId}
              activeChatId={chatId}
            />
          ))}
      </div>
      {chatId ? (
        <IndividualChat key={chatId} chatId={chatId} />
      ) : (
        <IndividualChatSkeleton />
      )}
    </div>
  );
}

type ChatProps = {
  chatId: string;
  title: string;
  client: string;
  lastMessage: string;
};

type ChatListItemProps = {
  chat: ChatProps;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  activeChatId: string;
};

const ChatListItem = ({ chat, activeChatId, setChatId }: ChatListItemProps) => {
  const { chatId, title, client, lastMessage } = chat;
  return (
    <div
      onClick={() => setChatId(chatId)}
      className={`flex items-center border w-full sm:w-96 border-solid border-gray-300 rounded-lg mb-3 p-4 cursor-pointer transition-transform duration-300 hover:shadow-md ${
        activeChatId === chatId && "border-l-4 border-l-blue-500"
      }`}
    >
      <div className="h-12 w-12 mr-4 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
        {client[0]}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-700">{title}</div>
        <div className="h-6 overflow-hidden text-gray-500">
          <span className="font-bold text-gray-600">{client}:</span>{" "}
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

Chats.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
