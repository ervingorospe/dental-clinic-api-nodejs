import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';
import { ENV } from '@config/env';
import { AppError } from "@utils/app-error";

export const tokenGenerator = (user: Record<string, string | boolean | number>, res: Response) => {
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

export const refreshToken = (token: string) => {
  if (!token) throw new AppError("Unauthorized", 401);;

  try {
    const decoded = jwt.verify(token, ENV.REFRESH_SECRET) as JwtPayload;
    const accessToken = jwt.sign({ id: decoded.id }, ENV.JWT_SECRET, { expiresIn: '15m' });

    return { accessToken }
  } catch (error) {
    throw new AppError("Invalid refresh token", 403);
  }
};

export const removeRefreshToken = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
