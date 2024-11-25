import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = async (user_id: string): Promise<string | null> => {
  try {
    const secret = process.env.JWT_SECRET!;

    // Generate the token
    const token = jwt.sign({ user_id }, secret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    return null;
  }
};

export const generateRefreshToken = async(user_id:string): Promise<string | null> => {
    try {
    const secret = process.env.JWT_SECRET!;

    // Generate the refresh token
    const refreshToken = jwt.sign({ user_id }, secret, { expiresIn: '7d' });
    return refreshToken;
  } catch (error) {
    console.error('Error generating refresh token:', error);
    return null;
  }
}

