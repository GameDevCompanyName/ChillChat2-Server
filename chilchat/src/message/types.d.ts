import type { Timestamp, Page } from "src/types/types";
import type { UserId } from "src/user/types";

export type MessageId = number;

export type MessageMarker = MessageId;

export class CreateMessageDto {
    author: UserId;
    text: string;
}

export class Message {
    id: MessageId;
    text: string;
    author: UserId;
    timestamp: Timestamp;
}

export type MessagePage = Page<Message, MessageMarker>;

