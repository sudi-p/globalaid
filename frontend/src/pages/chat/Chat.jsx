import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
// import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";

import styles from './styles/Chats.module.scss';
import getClient from "../../lib/api";
import PageNotFound from "../pagenotfound/PageNotFound";


export default function Chats() {
	const chatQuery = useQuery({
		queryKey: ["chat"],
		queryFn: async () => {
			const res = await getClient().get('/user/getchats')
			return res.data
		}
	});
	const { isLoading, error, data} = chatQuery;
	if (isLoading) return (<>Loading</>)
	if (error) return <PageNotFound/>
	return (
		<div className={styles.chatsContainer}>
			Chat
			{data.map(chat => (
				<ChatList chat={chat} key={chat.chatId}/>
			))}
		</div>
	)
}

const ChatList = ({chat}) => {
	const { chatId, title, client, lastMessage, time } = chat;
	const navigate = useNavigate();
	return (
		<>
		<div onClick={() => navigate(`/chat/${chatId}`)} className={styles.chat}>
			<div className={styles.title}>{title}</div>
			<div>{client}: {lastMessage}</div>
		</div>
		</>
	)
}
