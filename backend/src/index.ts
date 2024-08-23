import express from "express";
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

app.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

httpServer.listen(3000, () => {
	console.log("Server is running on port 3000");
});
