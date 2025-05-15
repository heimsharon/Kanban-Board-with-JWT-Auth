export interface UserLogin {
  username: string | null;
  password: string | null;
}

export interface LoginResponse {
  token: string;
}