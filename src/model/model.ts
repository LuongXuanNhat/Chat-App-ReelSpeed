export interface GroupInfo {
    name: string;
    groupId: string;
    public: string;
    host: string;
    members: User[];
    messages: Message[];
}

export interface Message {
    sender: string;
    type: "Text" | "Media" | "Document" | "Link";
    created_at: Date;
    text: string;
    file: string;
}

export interface User {
    fullname: string;
    about: string | null;
    avatar: string;
    email: string;
}
  
  