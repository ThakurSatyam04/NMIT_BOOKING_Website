import express from "express"
import { createEquip } from "../controllers/EquipController.js";

const router = express.Router();

router.post("/:id", createEquip)

export default router;