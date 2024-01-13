export const URL_API = 'http://localhost:3001/';
export const URL_SOCKET = 'http://localhost:3001';
export const MAX_RETRY_ATTEMPTS = 3;
export const DEFAULT_TIMEOUT = 5000;
export interface User {
    fullname: string | null,
    email: string | null,
    createdAt: string | null,
    avatar: string | null
};