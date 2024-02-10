import { ChatMessageModel } from "./chat-message.model";

export interface ExistingChatModel {
    chatId: number;
    title: string;
    messages: ChatMessageModel[];
}