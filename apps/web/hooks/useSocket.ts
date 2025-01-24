import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import { useSelector } from "react-redux";
export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    const tokenVal = useSelector((state: { user: { token: string } }) => state.user.token);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmQ0MmIwOC04YzU5LTRmZjEtODUzNC00ODJhM2E0NzJmYjkiLCJpYXQiOjE3Mzc0NDA1NDh9.Dyve9vkreAbW1dMe0zIoEsvK_N3hUjHQC6yPVMB1POQ"`);
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