// Filepath: client/src/interfaces/UserLogin.tsx
// This file contains  the user login and login response interfaces

export interface UserLogin {
  username: string | null;
  password: string | null;
}

export interface LoginResponse {
  token: string;
}