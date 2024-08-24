import express from "express";
import messageRouter from "./routes/messages.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import { createServer } from "http";
import SocketsService from "./services/sockets.js";
import cors from "cors";
import { startConsumeMessage } from "./services/kafka.js";
startConsumeMessage();
const httpServer = createServer(app);
app.use(
	cors({
		origin: "*",
	}),
);

export const init = async () => {
	const sockets = new SocketsService();

	sockets.io.attach(httpServer);

	httpServer.listen(3000, () => {
		console.log("Server is running on port 3000");
	});

	app.get("/", (req, res) => {
		res.send("Hello World");
	});

	app.use("/api", messageRouter);
	sockets.initListeners();
};
