import express from "express"
import { createEquip, getEquip, createSlot, updateSlot, getSlots, getSlot,  equipStatus } from "../controllers/EquipController.js";
// import { createEquip, getEquip, getSlot, updateSlot, createSlot, getSlots } from "../controllers/EquipController.js";

const router = express.Router();

router.post("/:labid", createEquip)
router.get("/:labid/:equipid", getEquip)

router.put("/slots/:equipid", createSlot)
router.put("/slots/:equipid/:slotid", updateSlot)
router.get("/slots/:equipid", getSlots)
router.get("/slots/:equipid/:slotid", getSlot)
router.put("/status/:equipid/", equipStatus)


// router.post("/:labid/:equipid/slots", createSlot)
// router.put("/:labid/:equipid/slots/:slotId", updateSlot)
// router.get("/:labid/:equipid/slots/:slotId", getSlot)

export default router;