import express from "express";
const app = express();
import { createServer } from "http";
import SocketsService from "./services/sockets.js";

const httpServer = createServer(app);

const init = async () => {
	const sockets = new SocketsService();

	sockets.io.attach(httpServer);

	httpServer.listen(3000, () => {
		console.log("Server is running on port 3000");
	});

	app.get("/", (req, res) => {
		res.send("Hello World");
	});

	sockets.initListeners();
};

init();
