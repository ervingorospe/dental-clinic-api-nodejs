import { Request, Response, NextFunction } from "express";
import { AppError } from '@utils/app-error'
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaErrorMap: Record<string, { status: number; message: string }> = {
      P2002: { status: 400, message: "Email already exists" },
      P2025: { status: 404, message: "Record not found" },
    };

    if (prismaErrorMap[err.code]) {
      res.status(prismaErrorMap[err.code].status).json({ message: prismaErrorMap[err.code].message });
      return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: 'Invalid input format' });
    return;
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(400).json({ message: "Invalid data input" });
    return;
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
