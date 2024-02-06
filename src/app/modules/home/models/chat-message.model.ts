import { ChatButton } from "./chat-button.model";

export interface ChatMessageModel {
    ai: boolean;
    buttons: ChatButton[];
    mentor: number;
    messages: string[];
}