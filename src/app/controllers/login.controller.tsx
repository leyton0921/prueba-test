
import { IUser } from '../interface/auth';

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUser; token: string } | null> => {

  try {
    
    const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { user, token } = data;
      localStorage.setItem('user', user.name);
      return { user, token };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};