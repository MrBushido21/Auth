import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";

export const checkBank = (secret: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const signatureFromHeader = req.headers["x-signature"];

    if (!signatureFromHeader || typeof signatureFromHeader !== "string") {
      return res.status(401).json({ message: "Missing signature" });
    }

    const rawBody = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("base64");

    if (signatureFromHeader !== expectedSignature) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    next();
  };
}
