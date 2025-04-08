import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '@config/env';
import { IUserDTO } from '@modules/user/interface';

interface AuthRequest extends Request {
  user?: IUserDTO;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as IUserDTO;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
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