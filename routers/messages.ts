import express from "express";
import fileDb from "../fileDb";
const messageRouter = express.Router();

messageRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const lastFiveMessages = await fileDb.getLastFiveMessages();
        res.send(lastFiveMessages);
    } catch (e) {
        console.error(e);
    }
});

messageRouter.post('/', async (req: express.Request, res: express.Response) => {
    const {message} = req.body;
    try {
        const savedMessages = await fileDb.save(message);
        res.send(savedMessages);
    } catch (e) {
        console.error(e);
    }
});

export default messageRouter;