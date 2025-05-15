import { UserLogin, LoginResponse } from "../interfaces/UserLogin";

const BASE_URL = process.env.REACT_APP_API_URL ||
  'http://localhost:3001';

const login = async (userInfo: UserLogin):
  Promise<LoginResponse> => {

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error('Error from user login:', err);
    throw new Error('Could not fetch user info');
  }
};

export { login };
