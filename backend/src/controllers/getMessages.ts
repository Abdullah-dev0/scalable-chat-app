import { prisma } from "../services/prismaClient.js";
import { Response, Request } from "express";

export const getAllMessages = async (req: Request, res: Response) => {
	try {
		const messages = await prisma.message.findMany();

		if (!messages) {
			return res.status(404).json({ message: "Messages not found" });
		}

		return res.status(200).json(messages);
	} catch (error: any) {
		console.log(error.message);
	}
};
