import express from "express"
import { createEquip, getEquip } from "../controllers/EquipController.js";

const router = express.Router();

router.post("/:labid", createEquip)
router.get("/:labid/:equipid", getEquip)

export default router;