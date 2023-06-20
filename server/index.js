import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import labsRoute from "./routes/labsRoute.js"
import equipRoute from "./routes/equipRoute.js"
import userRoute from "./routes/userRoute.js"
import emailRoute from "./routes/emailRoute.js"

const app = express();
dotenv.config(); 
 
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => { 
        console.log("DB connected successfully"); 
    })
    .catch((error) => console.log(`${error} did not connect`))

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
}) 

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
// app.use(express.urlencoded());

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/labs", labsRoute)
app.use("/api/equip", equipRoute)
app.use("/api/send-mail", emailRoute)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMsg = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus, 
        message:errorMsg,
        stack: err.stack 
    })
})

app.get("/", (req,res)=>{
    res.send("Success")
})

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`)
}) 
