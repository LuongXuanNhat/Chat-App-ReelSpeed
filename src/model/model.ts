export interface GroupInfo {
    _id: string;
    name: string;
    groupId: string;
    public: string;
    host: string;
    members: User[];
    messages: Message[];
}

export interface Message {
    _id: string;
    sender: string;
    type: "Text" | "Media" | "Document" | "Link";
    created_at: Date;
    text: string;
    file: string;
    fullname: string;
    avatar: string;
    pubDate: string;
}

export interface User {
    _id: string;
    fullname: string;
    about: string | null;
    avatar: string;
    email: string;
}
  
  