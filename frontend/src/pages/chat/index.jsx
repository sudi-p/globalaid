import React, { useState, lazy, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
// import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";

import styles from './Chats.module.scss';
import getClient from "@lib/api";
import PageNotFound from "../404";
import NavbarLayout from "@layout/navBarLayout";
// import IndividualChat from "./IndividualChat";
const IndividualChat = lazy(() => import("./IndividualChat"));

export default function Chats() {
	const [chatId, setChatId] = useState('');
	const chatQuery = useQuery({
		queryKey: ["chat"],
		queryFn: async () => {
			const res = await getClient().get('/user/getchats')
			return res.data
		},
		refetchInterval: 5000,
	});
	const { isLoading, error, data} = chatQuery;
	if (isLoading) return (<>Loading</>)
	if (error) return <PageNotFound/>
	return (
		<Stack spacing={4} direction="row" className={styles.chatsContainer}>
			<div>
			Chats
			{data.map(chat => (
				<ChatList chat={chat} key={chat.chatId}/>
			))}
			</div>
			<IndividualChat chatId={chatId}/>
		</Stack>
	)
}

const ChatList = ({chat, setChatId}) => {
	const { chatId, title, client, lastMessage, time } = chat;
	return (
		<div onClick={() => setChatId(chatId)} className={styles.chat}>
			<div className={styles.title}>{title}</div>
			<div>{client}: {lastMessage}</div>
		</div>
	)
}

Chats.getLayout = function getLayout(page){
	return(
		<NavbarLayout>{page}</NavbarLayout>
	)
}