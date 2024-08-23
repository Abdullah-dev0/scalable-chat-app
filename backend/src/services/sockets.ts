import { Server } from "socket.io";

class SocketsService {
	private _io: Server;

	constructor() {
		console.log("init sockets");
		this._io = new Server({
			cors: {
				allowedHeaders: ["*"],
				origin: "*",
			},
		});
	}

	get io() {
		return this._io;
	}

	public initListeners() {
		const io = this.io;
		console.log("init listeners");
		io.on("connect", (socket) => {
			console.log("new connection", socket.id);

			socket.on("new:message", async ({ message }: { message: string }) => {
				console.log("new message recived ", message);
			});
		});
	}
}

export default SocketsService;
