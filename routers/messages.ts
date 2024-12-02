import express from "express";
import fileDb from "../fileDb";
const messageRouter = express.Router();

messageRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('List of messages');
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