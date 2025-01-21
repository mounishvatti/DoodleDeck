import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
}

import { FC, useEffect, useState } from "react";

export const ChatRoom: FC<{ id: string }> = ({ id }) => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            const messages = await getChats(id);
            setMessages(messages);
        };
        fetchChats();
    }, [id]);

    return (
        <>
            <ChatRoomClient id={id} messages={messages} />
        </>
    );
};
