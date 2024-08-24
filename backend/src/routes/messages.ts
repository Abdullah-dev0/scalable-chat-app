import express from "express";

import { getAllMessages } from "../controllers/getMessages";

const messageRouter = express.Router();

messageRouter.get("/getmessages", getAllMessages);

export default messageRouter;
