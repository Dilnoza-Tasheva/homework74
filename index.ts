import express from "express";
import messageRouter from "./routers/messages";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messageRouter);

const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch(console.error);

