import { ChatButton } from "./chat-button.model";
import { MentorModel } from "./mentor.model";

export interface ChatMessageModel {
    ai: boolean;
    buttons: ChatButton[];
    mentors: MentorModel[];
    messages: string[];
}