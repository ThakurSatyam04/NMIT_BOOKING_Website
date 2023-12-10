import express from "express"
import {sendRequestEmail,confirmEmail,rejectEmail,requestsentEmail} from "../controllers/EmailController.js";

const router = express.Router();

router.post("/book", sendRequestEmail)
router.post("/confirm", confirmEmail)
router.post("/reject", rejectEmail)
router.post("/requestsent", requestsentEmail)


export default router;