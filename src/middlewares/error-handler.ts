import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  status: number;
  message: string;
  stack?: string;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const errorResponse: ErrorResponse = {
    status: statusCode,
    message: err.message || "Internal Server Error",
  };

  // Show error stack in development mode only
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
