import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
	sendMessage: (msg: string) => any;
	messages: string[];
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
	const state = useContext(SocketContext);
	if (!state) {
		throw new Error("SocketProvider is undefined");
	}
	return state;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<string[]>([]);
	const sendMessage: ISocketContext["sendMessage"] = useCallback(
		(msg) => {
			console.log("sending message", msg);
			if (socket) {
				socket.emit("new:message", {
					message: msg,
				});
			}
		},
		[socket],
	);

	const onMessageRec = useCallback((msg: string) => {
		console.log("From Server Msg Rec", msg);
		const { message } = JSON.parse(msg) as { message: string };
		setMessages((prev) => [...prev, message]);
	}, []);

	useEffect(() => {
		const _socket = io(import.meta.env.VITE_SERVER_URL);
		_socket.on("message", onMessageRec);
		setSocket(_socket);

		return () => {
			_socket.off("message", onMessageRec);
			_socket.disconnect();
			setSocket(undefined);
		};
	}, []);

	return <SocketContext.Provider value={{ sendMessage, messages }}>{children}</SocketContext.Provider>;
};
