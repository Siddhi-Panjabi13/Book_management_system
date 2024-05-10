import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/index';
import { IUSER, Request1, IPAYLOAD } from '../interface/index'
const jwt = require("jsonwebtoken")
import dotenv from 'dotenv';
import { ErrorHandler } from '../errorsHandlers/error';
import { responseError } from '../utils/responseError';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY
const revokedTokens = new Set();
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        const message = "Token not found..."
        const error = new ErrorHandler(message, 401)
        res.status(error.statusCode).json(responseError(message, error, false));
        return
    }
    if (revokedTokens.has(token)) {
        const message = 'Token revoked';
        const error = new ErrorHandler(message, 401)
        res.status(error.statusCode).json(responseError(message, error, false));
        return
    }
    jwt.verify(token, secretKey, async (error: any, decoded: IPAYLOAD) => {
        if (error) {
            const message = "Unauthorized user"
            const error = new ErrorHandler(message, 401)
            res.status(error.statusCode).json(responseError(message, error, false));
            return

        }
        else {
            const decodedName: string = decoded.uname;
            const user: IUSER | null = await User.findOne({ userName: decodedName })
            if (!user) {
                const message = "User not found..."
                const error = new ErrorHandler(message, 404)
                res.status(error.statusCode).json(responseError(message, error, false));
                return

            }
            else {
                (req as Request1).user = user;
                next();
            }
        }
    })
}
export { verifyToken, revokedTokens }