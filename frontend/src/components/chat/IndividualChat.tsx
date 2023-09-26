import React, { useRef } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import getClient from '../../lib/api';
import { Stack, TextField} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import PageNotFound from '../../pages/404';

type IndividualChatProps = {
    chatId: string,
}

type MessageProps ={
    index: number,
    content: string,
    createdAt: TimeRanges,
    senderName: string,
    sender: boolean,
    messageId: string,
}

export default function IndividualChat({chatId}: IndividualChatProps) {
    const inputChatRef = useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['chats', chatId],
        queryFn: async () => {
            console.log("Hello from fetching individual chat")
            const res = await getClient().get('/user/getindividualchat', {
                params: { chatId: chatId }
            });
            return res.data;
        },
        refetchInterval: 5000,
    });
    const chatMutation = useMutation({
        mutationFn: () => {
            return getClient().post('/user/sendChatMessage', {
                chatId: chatId,
                chatText: inputChatRef.current?.value,
            });
        },
        onSuccess: () =>{
            queryClient.invalidateQueries(['chats', chatId])
            if (inputChatRef.current){
                inputChatRef.current.value = "";
            }
        }
    })
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <PageNotFound />
    const { ad, messageList, location, client } = data;
    console.table(messageList);
    return (
        <div>
            <div className="text-xl">{ad} | {client.firstName}</div>
            <div className={"my-3 mx-auto"}>{location}</div>
            <div className="p-5 border border-solid border-gray-400">
                {messageList.map((message: MessageProps)=> {
                    const { sender, content, senderName, messageId } = message;
                    return (
                        <Stack key={messageId} justifyContent={sender ? 'flex-end' : 'flex-start'} spacing={2} direction="row">
                            <div>
                                <div style={{ textAlign: sender ? 'right' : 'left' }}>{sender ? 'Me' : senderName}</div>
                                <div className="w-52 bg-white border border-solid border-gray-300 rounded p-2 mt-1 mb-2">{content}</div>
                            </div>
                        </Stack>
                    )
                })}
                <Stack spacing={2} direction="row" alignItems="center">
                    <TextField
                        inputRef={inputChatRef}
                        size="small"
                        label="Enter your message"
                        fullWidth
                        variant="outlined"
                    />
                    <SendIcon onClick={() => chatMutation.mutate()} color="primary" />
                </Stack>
            </div>
        </div>
    )
}