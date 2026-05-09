//Higher order function return korbe fuction k

import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from 'jsonwebtoken';

const auth = () => {
    return(req:Request, res:Response, next: NextFunction )=>{
        const token = req.headers.authorization;
        if(!token){
            return res.status(500).json({message: "You are not allowed"})
        }
        const decode =jwt.verify(token, config.jwtSecret as string )
        console.log(decode)
        return next();
    }
}

export default auth;