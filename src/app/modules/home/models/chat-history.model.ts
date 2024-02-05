export interface IChatHistory {
    chatId: number;
    userId: number;
    title: string; 
    content: string; 
    isCurrent: boolean;
    createdAt: Date;
    updatedAt: Date;
}