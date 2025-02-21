import jwt from "jsonwebtoken";
import appError from "../utils/appError";
import { Request, Response, NextFunction } from "express";


declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = 
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader || typeof authHeader !== 'string') {
    const error = new appError(
      "Unauthorized: token is missing",
      401,
      "Fail"
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "");
    req.user = currentUser;
    next();
  } catch (err) {
    const error = new appError ("forbidden: invalid token", 403, "Fail");
    return next(error);
  }
};

export default verifyToken;
