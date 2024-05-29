import mongoose from "mongoose";
// import Ad from "./Ad";

// Conversation schema
const conversationSchema = new mongoose.Schema({
  ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
});

// Message schema
const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;

export const Message = mongoose.model("Message", messageSchema);
