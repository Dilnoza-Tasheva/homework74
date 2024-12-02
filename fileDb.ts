import {promises as fs} from 'fs';
import {Message} from "./types";
import path from "node:path";

const messages = "./messages";
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const messagesFiles = await fs.readdir(messages);
            data = await Promise.all(messagesFiles.map(async(file) => {
                const fileContent = await fs.readFile(path.join(messages, file));
                return JSON.parse(fileContent.toString()) as Message;
            }))
        } catch (e) {
            data = [];
        }
    },
    async save (message: string) {
        const timeIndicator = new Date().toISOString();
        const fileName = `${timeIndicator}.txt`;
        const fileLocation = path.join(messages, fileName);

        const messageContent: Message = {
            id: fileName,
            text: message,
            dateTime: timeIndicator,
        };
        await fs.writeFile(fileLocation, JSON.stringify(messageContent));
        data.push(messageContent);
        return messageContent;
    },
    async getLastFiveMessages() {
        return data.slice(data.length - 5);
    },
};

export default fileDb;