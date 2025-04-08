import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ENV } from '@config/env';
import { IUserDTO } from '@modules/user/interface'

export const tokenGenerator = (user: IUserDTO, res: Response) => {
  const accessToken = jwt.sign(user, ENV.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(user, ENV.REFRESH_SECRET, { expiresIn: '7d' });

  storeRefreshToken(res, refreshToken);

  return { accessToken };
};

const storeRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const refreshToken = (req: Request, res: Response) => {
  const token = req.body.refreshToken;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, ENV.REFRESH_SECRET) as JwtPayload;
    const accessToken = jwt.sign({ id: decoded.id }, ENV.JWT_SECRET, { expiresIn: '15m' });

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};
