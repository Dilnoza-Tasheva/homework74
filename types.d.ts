export interface Message {
    id: string;
    text: string;
    dateTime: string;
}

export type messageWithoutId = Omit<Message, 'id'>;