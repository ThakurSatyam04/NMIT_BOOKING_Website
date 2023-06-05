import Lab from "../models/Lab.js"
import Equip from "../models/Equip.js"

export const createEquip = async (req,res,next) => {
    const labId = req.params.equipid;
    const newEquip = new Equip(req.body)

    try {
        const savedEquip = await newEquip.save();
        res.status(200).json(savedEquip)
    } catch (err) {
        next(err);
    }
}