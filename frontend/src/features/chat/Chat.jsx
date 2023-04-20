import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon} from '@mui/icons-material';
import io from "socket.io-client";

import styles from './styles/Chats.module.scss';

let sampleData = [
	{
		chatId: "12342",
		userName: "Sudip Paudel",
		lastMessage: "Hello",
		time: "2022-12-27"
	},
	{
		chatId: "12423",
		userName: "Anjna",
		lastMessage: "Hi",
		time: "2022-12-27"
	}
]
const ENDPOINT = "http://localhost:3001";
var socket, selectedChatCompare;

export default function Chats() {
	const [ activeChat, setActiveChat] = useState(null);
	const [ socketConnected, setSocketConnected] = useState(false);
	const user = useSelector(state => state.loggedInUser)
	console.log(user)
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", user);
		socket.on("connection", () => setSocketConnected(true));
	}, [activeChat]);
	return(
		<div>
			Chat
			<Stack spacing={2} direction="row">
				<div>
					{sampleData.map(chat => (
						<ChatList chat={chat} setActiveChat={setActiveChat}/>
					))}
				</div>
				<div>
					{activeChat ? <ActiveChat activeChat={activeChat} /> : "Click on chat to see the full chat"}
				</div>
			</Stack>
		</div>
	)
}

const ActiveChat = (props) => {
	const { message } = props;
	const [ chatText, setChatText] = useState('');
	return (
		<div className={styles.chat}>
			Chats will be shown here.
			<Stack spacing={2} direction="row" alignItems="center">
				<TextField value={chatText} size="small" label="Enter your message" fullWidth variant="outlined"/>
				<SendIcon color="primary"/>
			</Stack>
		</div>
	)
}

const ChatList = (props) => {
	const { chat, setActiveChat} = props;
	const { chatId, userName, lastMessage, time} = chat;
	return (
		<div onClick ={() => setActiveChat(chat)} className={styles.chat}>
			{userName}: {lastMessage}
		</div>
	)
}
