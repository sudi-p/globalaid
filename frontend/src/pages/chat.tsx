import React, { useState, lazy, ReactNode } from "react";
import { Stack } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import getClient from "@lib/api";
import PageNotFound from "./404";
import NavbarLayout from "@components/layout/navBarLayout";
const IndividualChat = lazy(() => import("../components/chat/IndividualChat"));
import styles from '../styles/Chats.module.scss';

export default function Chats() {
	const [chatId, setChatId] = useState('');
	const { isLoading, error, data } = useQuery({
		queryKey: ["chat"],
		queryFn: async () => {
			const res = await getClient().get('/user/getchats')
			return res.data
		},
		refetchInterval: 5000,
	});
	if (isLoading) return (<>Loading</>)
	if (error) return <PageNotFound/>
	return (
		<Stack spacing={4} direction="row" className={styles.chatsContainer}>
			<div>
			Chats
			{data.map((chat: ChatProps) => (
				<ChatList chat={chat} key={chat.chatId} setChatId={setChatId} />
			))}
			</div>
			<IndividualChat chatId={chatId}/>
		</Stack>
	)
}

type ChatProps = {
	chatId: string,
	title: string,
	client: string,
	lastMessage: string,
}

type ChatListProps = {
	chat: ChatProps,
	setChatId: React.Dispatch<React.SetStateAction<string>>
}

const ChatList = ({chat, setChatId}: ChatListProps) => {
	const { chatId, title, client, lastMessage } = chat;
	return (
		<div onClick={() => setChatId(chatId)} className={styles.chat}>
			<div className={styles.title}>{title}</div>
			<div>{client}: {lastMessage}</div>
		</div>
	)
}

Chats.getLayout = function getLayout(page: ReactNode){
	return(
		<NavbarLayout>{page}</NavbarLayout>
	)
}