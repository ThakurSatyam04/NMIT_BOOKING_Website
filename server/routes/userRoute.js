import express from "express"
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/UserController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put(":/id", verifyUser, updateUser)
router.delete(":/id", verifyUser, deleteUser)
router.get("/:id", verifyUser, getUser)
router.get("/", verifyAdmin, getAllUser) 
export default router;