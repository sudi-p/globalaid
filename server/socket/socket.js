import { Server } from "socket.io";

const configureSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
    cookie: true,
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("joinRoom", ({ chatId }) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });
    socket.on("sendMessage", async ({ chatId, sender, content }) => {
      // const message = new Message({ conversation: chatId, sender, content });
      // await message.save();
      // io.to(chatId).emit("receiveMessage", {
      //   chatId,
      //   sender,
      //   content,
      //   createdAt: message.createdAt,
      // });
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
