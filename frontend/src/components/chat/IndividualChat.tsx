import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../lib/api";
import { TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import PageNotFound from "../../pages/404";
import { io, Socket } from "socket.io-client";

type IndividualChatProps = {
  chatId: string;
};

type MessageProps = {
  content: string;
  createdAt?: TimeRanges | string;
  isMyMessage: boolean;
  messageId: string;
};

export default function IndividualChat({ chatId }: IndividualChatProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  let socketRef = useRef<Socket | null>(null);
  const inputChatRef = useRef<HTMLInputElement | null>(null);
  const {
    data: chatData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: async () => {
      const res = await axiosPrivate.get("/user/getindividualchat", {
        params: { chatId },
      });
      return res.data;
    },
    enabled: !!chatId,
  });

  useEffect(() => {
    const socket = io("http://localhost:3001/");
    socketRef.current = socket;
    if (chatId) {
      socket.emit("joinRoom", { chatId });
    }
    socket.on("receiveMessageToOther", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("receiveMessageToSelf", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    if (chatData) {
      const { messageList } = chatData;
      setMessages(messageList);
    }
  }, [chatData]);
  const sendChatMessage = () => {
    if (inputChatRef.current) {
      const message = inputChatRef.current.value;
      if (message && socketRef.current) {
        const { userId } = chatData;
        console.log(chatId, message, userId);
        const socket = socketRef.current;
        socket.emit("sendMessage", {
          chatId,
          content: message,
          senderId: userId,
        });
        inputChatRef.current.value = "";
      }
    }
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <PageNotFound />;
  const { ad, location, client } = chatData;

  return (
    <div>
      <div className="border border-solid flex flex-col border-gray-400 rounded-lg h-[500px] w-[500px]">
        <div className="p-5 border-0 border-b border-solid border-gray-300">
          <div className="text-xl">
            {ad} | {client.firstName}
          </div>
          <div className={"my-3 mx-auto "}>{location}</div>
        </div>
        <div className="p-5 h-96 overflow-scroll">
          {messages.map((message: MessageProps) => {
            const { content, isMyMessage, messageId, createdAt } = message;
            return (
              <div
                key={messageId}
                className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
              >
                {createdAt && (
                  <p className="font-thin text-gray-300">
                    {createdAt.toString()}
                  </p>
                )}
                <div
                  className={`w-52 bg-white border border-solid border-gray-300 rounded p-2 mt-1 mb-2 ${isMyMessage && "bg-blue-200"}`}
                >
                  {content}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" w-full p-5 flex gap-2 items-center relative">
          <TextField
            inputRef={inputChatRef}
            size="small"
            label="Enter your message"
            fullWidth
            variant="outlined"
          />
          <SendIcon
            onClick={sendChatMessage}
            color="primary"
            className="absolute right-6"
          />
        </div>
      </div>
    </div>
  );
}
