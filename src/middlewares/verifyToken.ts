import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/index';
import { IUSER, Request1,IPAYLOAD } from '../interface/index'
const jwt = require("jsonwebtoken")
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY
const revokedTokens = new Set();
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"];
    if (!token) {
       return res.status(401).json({ "Message": "Token not found..." });
    }
    if (revokedTokens.has(token)) {
        return res.status(403).json({ message: 'Token revoked' });
    }
    jwt.verify(token, secretKey, async (error: any, decoded:IPAYLOAD) => {
        if (error) {
            res.json({ "message": "Unauthorized user" });
        }
        else {
            const decodedName: string = decoded.uname;
            const user: IUSER|null = await User.findOne({ userName: decodedName })
            console.log("User", user);
            if (!user) {
                return res.json({ "message": "User not found..." });
            }
            else {
                (req as Request1).user = user;
                next();
            }
        }
    })
}
export  {verifyToken,revokedTokens}