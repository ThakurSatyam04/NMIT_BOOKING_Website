import express from "express"
import { getUsers,login, signup,sendPasswordLink, VerifyUser, changePassword } from "../controllers/AuthController.js";
// import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router();

router.get("/users", getUsers);
router.post("/sendpasswordlink", sendPasswordLink);
router.get("/forgotpassword/:id/:token", VerifyUser)
router.post("/:id/:token", changePassword)
router.post("/signup", signup)
router.post("/login", login)

export default router;