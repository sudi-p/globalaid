import React, { useState, lazy, ReactNode, useEffect } from "react";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@lib/api";
import PageNotFound from "./404";
import NavbarLayout from "@components/layout/navBarLayout";
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
  if (isLoading) return <>Loading</>;
  if (error) return <PageNotFound />;
  return (
    <div className="flex gap-4 w-[90%] p-7 m-auto justify-center">
      <div>
        Chats
        {data.map((chat: ChatProps) => (
          <ChatListItem
            chat={chat}
            key={chat.chatId}
            setChatId={setChatId}
            activeChatId={chatId}
          />
        ))}
      </div>
      {chatId ? <IndividualChat key={chatId} chatId={chatId} /> : "Fetching"}
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
      className={`border w-96 border-solid border-gray-300 rounded-lg mb-3 p-3 cursor-pointer ${activeChatId == chatId && "border-l-4 border-blue-300"}`}
    >
      <div className="text-xl font-semibold">{client}</div>
      <div className="h-6 overflow-hidden">{lastMessage}</div>
    </div>
  );
};

Chats.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
