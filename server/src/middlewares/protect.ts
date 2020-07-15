import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { db } from "../database";
import { catchError, AppError } from "../utils";

interface payloadProps {
  userId: number;
  tokenVersion: number;
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const protect = catchError(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
      throw new AppError(401, "'Authorization' header not found.");
    }
    // Authorization example: "Bearer sometoken"
    const accessToken = (Authorization as string).split(" ")[1];
    if (!accessToken) {
      throw new AppError(401, "'Authorization' header is invalid.");
    }
    // Verify access token with secret.
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    // Get user with user id and token version.
    const user = await db("users")
      .select()
      .where({
        id: (payload as payloadProps).userId,
        token_version: (payload as payloadProps).tokenVersion,
      });
    if (!user.length) {
      throw new AppError(401, "'Authorization' header is invalid.");
    }
    // Assign user object as property to request object.
    req.user = user[0];
    next();
  }
);
