import jwt from "jsonwebtoken"
import { createError } from "./error.js";

export const verifyToken = (req,res,next) => {
    // const token = req.cookies.jwt;
    // console.log(`This is the cookie of login ${req.cookies.jwt}`)
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }
    jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
        if(err)
            return next(createError(403, "Token is not valid"))
        req.user = user;
        next();
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            if(err)
                return next(createError(403, "you are not authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.isAdmin){
            console.log(user)
            next()
        }
        else{
            if(err)
                return next(createError(403, "you are not authorized"))
        }
    })
}