import express from "express"
import { login, signup } from "../controllers/AuthController.js";
// import {verifyToken} from "../utils/verifyToken.js"


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

export default router;