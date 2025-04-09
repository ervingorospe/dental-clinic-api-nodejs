import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '@config/env';
import UserDTO from '@modules/user/dto/user';

interface AuthRequest extends Request {
  user?: UserDTO;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as UserDTO;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const checkOwnership = (req: AuthRequest, res: Response, next: NextFunction) => {
  const loggedInUserId = req.user?.id;
  const id = parseInt(req.params.id, 10);

  if (loggedInUserId === undefined || loggedInUserId !== id) {
    res.status(403).json({ message: "Forbidden: You can only update your own account" });
    return;
  }

  next();
};

// export const authorizeRole = (role: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;

//     if (user?.role !== role) {
//       return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
//     }

//     next(); // Allow the request to proceed if the role matches
//   };
// };