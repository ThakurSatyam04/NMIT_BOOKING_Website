import express from "express"
import { createEquip, getEquip, deleteEquip} from "../controllers/EquipController.js";

const router = express.Router();

router.post("/:labid", createEquip)
router.get("/:labid/:equipid", getEquip)
router.delete("/:labid/:equipid",deleteEquip)
export default router; 