import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createLab, deleteLab, getAllLab, getEquips, getLab, updateLab } from "../controllers/LabController.js";

const router = express.Router();

router.post("/", createLab);
router.put("/:id", updateLab);
router.delete("/:id",verifyAdmin, deleteLab);
router.get("/:id", getLab);
router.get("/", getAllLab);

router.get("/equip/:id", getEquips)

export default router;