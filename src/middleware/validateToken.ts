import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from '../utils/jwt';
import BadRequest from '../error/error';
import { findUserById } from '../services/user.service';

// Interface to ensure correct typing for user in request
interface UserRequest extends Request {
  user?: JwtPayload & { user_id: string }; // Attach decoded user information to the request
}

// Helper function to verify the access token
export const verifyAccessToken = (token: string): JwtPayload & { user_id: string } | string => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Type Guard: Ensure decoded is not a string and is of type JwtPayload
    if (typeof decoded === 'string') {
      throw new Error('Invalid token');
    }

    // Assert the token has a 'user_id' property
    if ('user_id' in decoded) {
      return decoded as JwtPayload & { user_id: string }; // Type assertion
    }

    throw new Error('Token does not contain user_id');

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return 'Token has expired';
    }
    throw new Error('Invalid or expired token');
  }
};

// Authorization middleware to check the token and validate the user
const Authorization = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new BadRequest('Authorization token is missing');
    }

    // Extract token from 'Bearer <token>'
    const token = authorizationHeader.split(' ')[1];
    const tokenData = verifyAccessToken(token);

    // Handle expired token scenario
    if (tokenData === 'Token has expired') {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new BadRequest('Please login again');
      }

      // Validate the refresh token
      const refreshTokenData = verifyAccessToken(refreshToken);
      if (refreshTokenData === 'Token has expired' || typeof refreshTokenData === 'string') {
        throw new BadRequest('Please login again');
      }

      // Generate new access token from refresh token data
      const newAccessToken = await generateAccessToken(refreshTokenData.user_id);
      res.setHeader('Authorization', `Bearer ${newAccessToken}`);
      req.user = refreshTokenData; // Attach user data to the request
    } else {
      // If the token is not expired, attach the user data to the request
      req.user = tokenData as JwtPayload & { user_id: string };
    }

    // Find user by ID to verify existence
    const exisitingUser = await findUserById(req.user?.user_id);
    if (!exisitingUser) {
      throw new BadRequest('User not found');
    }

    next();
  } catch (error: any) {
    console.error('An error occurred in the authorization middleware', error);
    res.status(401).json({ message: error.message });
  }
};

export const AuthorizationPremium = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new BadRequest('Authorization token is missing');
    }

    // Extract token from 'Bearer <token>'
    const token = authorizationHeader.split(' ')[1];
    const tokenData = verifyAccessToken(token);

    // Handle expired token scenario
    if (tokenData === 'Token has expired') {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new BadRequest('Please login again');
      }

      // Validate the refresh token
      const refreshTokenData = verifyAccessToken(refreshToken);
      if (refreshTokenData === 'Token has expired' || typeof refreshTokenData === 'string') {
        throw new BadRequest('Please login again');
      }

      // Generate new access token from refresh token data
      const newAccessToken = await generateAccessToken(refreshTokenData.user_id);
      res.setHeader('Authorization', `Bearer ${newAccessToken}`);
      req.user = refreshTokenData; // Attach user data to the request
    } else {
      // If the token is not expired, attach the user data to the request
      req.user = tokenData as JwtPayload & { user_id: string };
    }

    // Find user by ID to verify existence
    const exisitingUser = await findUserById(req.user?.user_id);
    if (!exisitingUser) {
      throw new BadRequest('User not found');
    }
    if (exisitingUser.subscribed.isSubscribe != true){
      throw new BadRequest('Unauthorized access. Please pay for a subscription.')
    }
    const currentDate = new Date(); // Current date
    const paymentDate = exisitingUser.subscribed.paymentDate;

    if (paymentDate) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
       if(paymentDate <oneMonthAgo){
        throw new BadRequest('Subscription expired. Please renew.')
       }
    }
    next();
  } catch (error: any) {
    console.error('An error occurred in the authorization middleware', error);
    res.status(401).json({ message: error.message });
  }
};

export default Authorization;
