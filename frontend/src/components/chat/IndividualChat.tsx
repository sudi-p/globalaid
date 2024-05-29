import React, { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import getClient, { axiosPrivate } from "../../lib/api";
import { Stack, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import PageNotFound from "../../pages/404";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");

type IndividualChatProps = {
  chatId: string;
};

type MessageProps = {
  index: number;
  content: string;
  createdAt: TimeRanges;
  senderName: string;
  sender: boolean;
  messageId: string;
};

export default function IndividualChat({ chatId }: IndividualChatProps) {
  const [messages, setMessages] = useState([]);
  const inputChatRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
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
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { messageList } = data;
      setMessages(messageList);
    }
  }, [data]);
  const chatMutation = useMutation({
    mutationFn: () => {
      return getClient.post("/user/sendChatMessage", {
        chatId: chatId,
        chatText: inputChatRef.current?.value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", chatId]);
      if (inputChatRef.current) {
        inputChatRef.current.value = "";
      }
    },
  });
  const sendChatMessage = () => {
    if (inputChatRef.current) {
      const message = inputChatRef.current.value;
      socket.emit("sendMessage", { message });
    }
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <PageNotFound />;
  const { ad, messageList, location, client } = data;
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
            const { sender, content, senderName, messageId } = message;
            return (
              <Stack
                key={messageId}
                justifyContent={sender ? "flex-end" : "flex-start"}
                spacing={2}
                direction="row"
              >
                <div>
                  <div style={{ textAlign: sender ? "right" : "left" }}>
                    {sender ? "Me" : senderName}
                  </div>
                  <div className="w-52 bg-white border border-solid border-gray-300 rounded p-2 mt-1 mb-2">
                    {content}
                  </div>
                </div>
              </Stack>
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
