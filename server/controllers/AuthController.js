import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"; 
import dotenv from "dotenv"
dotenv.config();

export const signup = async (req,res,next) => {
    try {
        console.log(req.body);
        const {name, email, password,userType } = req.body;

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
        console.log(newUser);

        const token = await newUser.generateAuthToken();
        // console.log(token)
        res.cookie("jwt",token,{
            // expires:new Date(Date.now() + 10000),
            httpOnly:true,
            // secure:true
        })
        // console.log(cookie)

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

        const token = await user.generateAuthToken();
        console.log(token)

        res.cookie("jwt",token,{
            // expires:new Date(Date.now() + 10000),
            httpOnly:true,
            // secure:true
        })

        if(isPasswordCorrect){
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
