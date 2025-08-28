import jwt, { JwtPayload }  from 'jsonwebtoken'
import express, { NextFunction,Response,Request } from 'express'
import { JWT_SECRET } from '@repo/common/common'

export async function Middleware(req:Request,res:Response,next:NextFunction){
    const authorization  = req.headers.authorization
    const token = authorization && authorization.split(' ')[1]

    if(!token){
        return res.status(400).json({msg:"no token found"})
    }
    
    const decoded = jwt.verify(token,JWT_SECRET) as { id?: string };
    if(!decoded){return res.status(400).json({msg:"invalid token"})}
    req.user = decoded.id
    next()
}