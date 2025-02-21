import { PrismaClient } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';
import AppError from '../utils/appError';
import { generateAccessToken } from '../utils/generateJWT';
import bcrypt from 'bcrypt';
import { revokeAccessToken } from '../utils/blackList';
const prisma = new PrismaClient();

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await prisma.user.findMany();
    res.status(200).json({
        status: "SUCCESS",
        message: "Users retrieved successfully",
        data: users
    })
}

async function register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findFirst({
        where: { email: email }
    })
    if (existingUser) {
        const error = new AppError("User already exists", 400, "FAIL");
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email
    });
    res.status(201).json({
        status: "SUCCESS",
        message: "User created successfully",
        data: {user, accessToken}
    })
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: { email: email }
    })
    if (!user) {
        const error = new AppError("User not found", 404, "FAIL");
        return next(error);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        const error = new AppError("Invalid password", 400, "FAIL");
        return next(error);
    }
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email
    });
    res.status(200).json({
        status: "SUCCESS",
        message: "User logged in successfully",
        data: {user, accessToken}
    })
}

async function logout(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id }
    });
  if (!user) {
    const error = new AppError("User not found", 404, "FAIL");
    return next(error);
  }

  req.user = null;
  if (req.headers.authorization) {
    revokeAccessToken(req.headers.authorization.split(" ")[1]);
  } else {
    const error = new AppError("Authorization header is missing", 400, "FAIL");
    return next(error);
  }

    res.status(200).json({
        status: "SUCCESS",
        message: "User logged out successfully"
    })
}

export {getAllUsers, register, login, logout};