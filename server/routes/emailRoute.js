import express from "express"
import {sendEmail,confirmEmail,rejectEmail} from "../controllers/EmailController.js";

const router = express.Router();

router.post("/book", sendEmail)
router.post("/confirm", confirmEmail)
router.post("/reject", rejectEmail)

export default router;