import React from "react";
import IndividualChat, { IndividualChatSkeleton } from "./IndividualChat";

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

type ChatListProps = {
  chats: Array<ChatProps>;
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
};

const ChatList = ({ chats, chatId, setChatId }: ChatListProps) => {
  return (
    <div className="flex gap-4 p-7 m-auto">
      <div>
        {chats &&
          chats.map((chat: ChatProps) => (
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

export default ChatList;
