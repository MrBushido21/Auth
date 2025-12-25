import type { Request, Response, NextFunction } from "express";
import { logError } from "./logger.js";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logError(err);
  res.status(500).json({ message: "Internal server error" });
}

