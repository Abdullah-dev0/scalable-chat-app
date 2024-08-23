import { useState } from "react";
import { useSocket } from "./context/SocketsProvider";

const App = () => {
	const [message, setMessage] = useState("");

	const { sendMessage } = useSocket();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendMessage(message);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default App;
