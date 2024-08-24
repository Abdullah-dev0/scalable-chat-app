import { Kafka, logLevel, Producer } from "kafkajs";
import { prisma } from "../services/prismaClient";

require("dotenv").config();

const kafka = new Kafka({
	brokers: [process.env.KAFKA_BROKER as string],
	ssl: true,
	sasl: {
		mechanism: "scram-sha-256",
		username: process.env.KAFKA_USERNAME as string,
		password: process.env.KAFKA_PASSWORD as string,
	},
	logLevel: logLevel.ERROR,
});

let producer: null | Producer;

const createProducer = async () => {
	if (producer) return producer;
	const _producer = kafka.producer();
	await _producer.connect();
	producer = _producer;
	return producer;
};

export const produceMessage = async (message: string) => {
	const producer = await createProducer();
	await producer.send({
		messages: [{ key: `message-${Date.now()}`, value: message }],
		topic: "MESSAGES",
	});
	return true;
};

export const startConsumeMessage = async () => {
	console.log("Consumer is running..");
	const consumer = kafka.consumer({ groupId: "default_id" });
	await consumer.connect();
	await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

	await consumer.run({
		autoCommit: true,
		eachMessage: async ({ message, pause }) => {
			if (!message.value) return;
			try {
				await prisma.message.create({
					data: {
						text: message.value.toString(),
					},
				});
			} catch (error: any) {
				console.log("Something is wrong");
				pause();
				setTimeout(() => {
					consumer.resume([{ topic: "MESSAGES" }]);
				}, 60 * 1000);
			}
		},
	});
};

export default kafka;
