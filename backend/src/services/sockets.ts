import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";

const pub = new Redis(process.env.REDIS_URL as string);

const sub = new Redis(process.env.REDIS_URL as string);


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
		sub.subscribe("MESSAGES");
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
				await pub.publish("MESSAGES", JSON.stringify({ message }));
			});
		});

		sub.on("message", async (channel, message) => {
			console.log("message recived from redis", message);
			if (channel === "MESSAGES") {
				io.emit("message", message);
				await produceMessage(message);
				console.log("Message Produced to Kafka Broker");
			}
		});
	}
}

export default SocketsService;
