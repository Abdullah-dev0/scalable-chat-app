import { createContext, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

interface ISocketContext {
	sendMessage: (msg: string) => any;
	// messages: string[];
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
		console.log("sending message", msg);
	}, []);

	useEffect(() => {
		const _socket = io("http://localhost:3000");

		return () => {
			_socket.disconnect();
		};
	}, []);

	return <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>;
};
