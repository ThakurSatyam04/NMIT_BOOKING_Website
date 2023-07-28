import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"; 
import dotenv from "dotenv"

// For forgot password
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

dotenv.config();


export const getUsers = async(req,res,next) =>{
    const {...others} = req.query;
    try {
        const users = await User.find({
            ...others,
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

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

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'satyamrock04.2000@gmail.com',
      pass: 'lupdurkjmcqggaha'
    }
});

export const sendPasswordLink = async (req,res,next) => {

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401, message:"Enter your email"})
    }

    try {
        const userfind = await User.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
        });
        
        const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifyToken:token},{new:true});

        if(setusertoken){
            const mailOptions = {
                from:'associate.dean.research@nmit.ac.in',
                to:email,
                subject:"Sending Email For Password Reset",
                text:`This link is valid only for 2 minutes https://www.nmit-equipment-booking.in/forgotpassword/${userfind.id}/${setusertoken.verifyToken}` 
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        next(error)
    }
} 

export const VerifyUser = async (req,res,next) => {
    const {id,token} = req.params;

    try {
        const validuser = await User.findOne({_id:id,verifyToken:token});
        const VerifyToken = jwt.verify(token,process.env.JWT_SECRET);

        // console.log(VerifyToken)

        if(validuser && VerifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }

}

export const changePassword = async (req,res,next) => {
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await User.findOne({_id:id,verifyToken:token});
        
        const VerifyToken = jwt.verify(token,process.env.JWT_SECRET);

        if(validuser && VerifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
}
