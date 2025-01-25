import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import { useSelector } from "react-redux";
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    //@ts-ignore
    let tokenVal = useSelector((state) => state.user.token);
    if (!tokenVal) {
        tokenVal = typeof window !== "undefined"? localStorage.getItem("token") || null : null;
    }

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${tokenVal}`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}