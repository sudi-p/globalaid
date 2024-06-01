import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../lib/api";
import { Skeleton, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import PageNotFound from "../../pages/404";
import { io, Socket } from "socket.io-client";

type IndividualChatProps = {
  chatId: string;
};

type MessageProps = {
  content: string;
  createdAt?: Date | string;
  isMyMessage: boolean;
  messageId: string;
  senderName: string;
};

export default function IndividualChat({ chatId }: IndividualChatProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  let socketRef = useRef<Socket | null>(null);
  const inputChatRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
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
      setMessages((messages) => [message, ...messages]);
    });
    socket.on("receiveMessageToSelf", (message) => {
      setMessages((messages) => [message, ...messages]);
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

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView();
  //   }
  // }, [messages]);

  const sendChatMessage = () => {
    if (inputChatRef.current) {
      const message = inputChatRef.current.value;
      if (message && socketRef.current) {
        const { userId } = chatData;
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
  if (isLoading) return <IndividualChatSkeleton />;
  if (error) return <PageNotFound />;
  const { ad, location, client } = chatData;

  return (
    <div className="flex-1">
      <div className="border border-solid flex flex-col border-gray-200 rounded-lg h-[calc(100vh-5rem)] shadow-md">
        <div className="p-4 border-0 border-b border-solid border-gray-300 flex flex-col items-center bg-gray-100">
          <div className="text-2xl font-semibold text-gray-700">
            {ad} | {client.firstName}
          </div>
          <div className="my-2 text-gray-500">{location}</div>
        </div>
        <div className="p-4 overflow-y-scroll bg-white flex-1 flex flex-col-reverse">
          {messages.map((message: MessageProps, index) => {
            const { content, isMyMessage, messageId, createdAt, senderName } =
              message;
            return (
              <div
                key={messageId}
                ref={index == messages.length - 1 ? messagesEndRef : null}
              >
                {createdAt && (
                  <div className="relative border border-solid border-gray-300 w-full my-4">
                    <p className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-thin text-gray-400 bg-white px-2">
                      {createdAt === "Today"
                        ? "Today"
                        : new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                )}
                <div
                  className={`flex ${isMyMessage ? "justify-end" : "justify-start"} my-2 items-center`}
                >
                  {!isMyMessage && (
                    <div className="h-12 w-12 flex justify-center items-center bg-gray-300 rounded-full mr-3 font-bold">
                      {senderName[0]}
                    </div>
                  )}
                  <div
                    className={`max-w-xs border border-solid border-gray-300 rounded-3xl p-3 ${
                      isMyMessage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } shadow-sm`}
                  >
                    {content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full p-4 flex gap-2 items-center bg-gray-100">
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
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export const IndividualChatSkeleton = () => {
  return (
    <div className="flex-1">
      <div className="border border-solid flex flex-col border-gray-200 rounded-lg h-[calc(100vh-5rem)] shadow-md">
        <div className="p-4 border-0 border-b border-solid border-gray-300 flex flex-col items-center bg-gray-100">
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={150} height={20} className="my-2" />
        </div>
        <div className="p-4 overflow-y-scroll bg-white flex-1 ">
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
  );
};
