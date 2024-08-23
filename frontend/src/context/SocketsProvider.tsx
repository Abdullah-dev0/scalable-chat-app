import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
	sendMessage: (msg: string) => any;
	// messages: string[];
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

	useEffect(() => {
		const _socket = io("http://localhost:3000");
		setSocket(_socket);

		return () => {
			_socket.disconnect();
			setSocket(undefined);
		};
	}, []);

	return <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>;
};
