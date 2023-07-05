import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getClient from '../../lib/api';
import { Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import PageNotFound from '../pagenotfound/PageNotFound';
import styles from './styles/IndividualChat.module.scss';

export default function IndividualChat() {
    const { chatText, setChatText } = useState('');
    const params = useParams();
    const chatId = params.chatId;
    const { data, isLoading, error } = useQuery({
        queryKey: ['individualchat'],
        queryFn: async () => {
            const res = await getClient().get('/user/getindividualchat', {
                params: { chatId: chatId }
            });
            return res.data;
        }
    });
    console.log("Hello from Individual Chat")
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <PageNotFound />
    const { ad, messageList, location, client } = data;
    return (
        <div className={styles.messagesContainer}>
            <div className={styles.ad}>{ad} | {client.firstName}</div>
            <div className={styles.location}>{location}</div>
            <div className={styles.messages}>
                {messageList.map(message => {
                    const { sender, content, senderName } = message;
                    return (
                        <Stack justifyContent={sender?'flex-end': 'flex-start'} spacing={2} direction="row">
                            <div>
                                <div style={{textAlign: sender? 'right': 'left'}}>{sender? 'Me':senderName}</div>
                                <div className={styles.message}>{content}</div>
                            </div>
                        </Stack>
                    )
                })}
                <Stack spacing={2} direction="row" alignItems="center">
                    <TextField value={chatText} size="small" label="Enter your message" fullWidth variant="outlined" />
                    <SendIcon color="primary" />
                </Stack>
            </div>

        </div>
    )
}
