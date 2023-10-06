import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import { fileURLToPath } from 'url';

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", exteneded: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


//File Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file,cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

//middleware for cookies
app.use(cookieParser());

//Routes with files
// app.post("/auth/register", upload.single("picture"), register);

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

//Socket
import { Server } from 'socket.io';
import http from 'http';
const httpServer = http.createServer(app); 
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})
io.on("connection", (socket) => {
    console.log("Nice! connected to socket.io")
    socket.on('setup', (userData)=>{
        socket.join(userData._id)
        socket.emit('connected');
    })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined Room: "+room)
    })
})
//Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    httpServer.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`))
}).catch((error) => console.log(error));
