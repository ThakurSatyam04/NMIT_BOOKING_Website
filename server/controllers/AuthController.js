import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";
import dotenv from "dotenv"
dotenv.config();

export const signup = async (req,res,next) => {
    try {
        console.log(req.body);
        const {name, email, password } = req.body;

        // check if user already exists  
        const existingUser = await User.findOne({email}); 
        if(existingUser){ 
            console.log("User Already Registered")
            // res.send({message:"User already registered"});
            return next(createError(400, "user already exists"))
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            ...req.body,
            password: hash,
        })
        await newUser.save();
        console.log("User Created Successfully")
        res.status(200).send("User Created Successfully")
    } 
    catch (err) {
        return next(createError(500, "User cannot be registered"))
    }
}

export const login = async (req,res,next) => {
    try {
        console.log(req.body)
        const { email, password } = req.body; 
        // email and password validation
        if(!email || !password) {
            return next(createError(400, "Email and password are required"))
        }
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return next(createError(400, "User not found"))
        }
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(isPasswordCorrect){
            let token = jwt.sign(
                { id: user._id, email:user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET, 
            )  
            // user = user.toObject();
            // user.token = token;
            user.password = undefined;

            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ 
                success:true,
                user,
                token,
                message:"Login Successful",
            })
            res.send({message:"Login Successful" , user:user})
            console.log("Login Successful")
        }
        else{ 
            console.log("Password is Incorrect")
            return next(createError(400, "Password is Incorrect"))
        }
    }   
    catch(error){
        return next(createError(500, "Server Error"))
    }
};
