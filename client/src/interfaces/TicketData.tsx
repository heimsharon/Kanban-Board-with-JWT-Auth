// Filepath: client/src/interfaces/TicketData.tsx
// This file contains the API call for user login
import { UserData } from './UserData';

export interface TicketData {
    id: number | null;
    name: string | null;
    description: string | null;
    status: string | null;
    assignedUserId: number | null;
    assignedUser: UserData | null;
    createdAt: string | null;
    updatedAt: string | null;
}
