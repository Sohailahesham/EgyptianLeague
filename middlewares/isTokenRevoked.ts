import appError from "../utils/appError";
import { blackList } from "../utils/blackList";
import { Request, Response, NextFunction } from "express";

const isTokenRevoked = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new appError("Authorization header is missing", 401, "FAIL");
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  if (blackList.has(token)) {
    const error = new appError("Token has been revoked", 401, "FAIL");
    return next(error);
  }
  next();
};

export {
  isTokenRevoked,
};
