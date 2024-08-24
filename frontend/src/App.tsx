import { useEffect, useState } from "react";
import { useSocket } from "./context/SocketsProvider";
import axios from "axios";

const App = () => {
	const [message, setMessage] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	const { sendMessage, messages } = useSocket();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message) return;
		sendMessage(message);
		setMessage(""); // Clear the input after sending
	};

	useEffect(() => {
		const getMessages = async () => {
			try {
				const { data } = await axios.get("http://localhost:3000/api/getmessages");
				setAllMessages(data);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		getMessages();
	}, [allMessages]);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Send</button>
			</form>

			<ul>
				{messages.map((msg, i) => (
					<li key={i}>{msg}</li>
				))}
			</ul>

			<h1>All Messages</h1>
			<ul>
				{allMessages.map((msg: any, i: number) => {
					const message = JSON.parse(msg.text);
					return (
						<li key={i}>
							<p>{message.message}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
