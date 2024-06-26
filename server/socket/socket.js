import { Server } from "socket.io";
import { sendChatMessage } from "../controllers/users.controllers.js";

const configureSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
    cookie: true,
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ chatId }) => {
      socket.join(chatId);
    });
    socket.on("sendMessage", async ({ chatId, content, senderId }) => {
      const { messageId, senderName } = await sendChatMessage(
        chatId,
        content,
        senderId
      );
      socket.broadcast.to(chatId).emit("receiveMessageToOther", {
        chatId,
        isMyMessage: false,
        content,
        senderName,
        messageId,
      });
      socket.emit("receiveMessageToSelf", {
        chatId,
        isMyMessage: true,
        content,
        senderName,
        messageId,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

export default configureSocket;

// import jwt from "jsonwebtoken";
// import cookie from "cookie";

// Authenticating SOCKET Part
// io.use((socket, next) => {
//   try {
//     console.log("Hello");
//     const cookies = socket.request.headers;
//     console.log(cookies);
//     if (!cookies) {
//       return next(new Error("Authentication error"));
//     }
//     const parsedCookies = cookie.parse(cookies);
//     const token = parsedCookies["accessToken"];

//     if (!token) {
//       return next(new Error("Authentication error"));
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         return next(new Error("Authentication error"));
//       }

//       socket.user = decoded; // Save decoded user info to socket object
//       next();
//     });
//   } catch (error) {
//     next(new Error("Internal server error"));
//   }
// });
