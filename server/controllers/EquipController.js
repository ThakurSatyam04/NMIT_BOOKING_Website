import Lab from "../models/Lab.js"
import Equip from "../models/Equip.js"

export const createEquip = async (req,res,next) => {
    const labId = req.params.labid;
    const newEquip = new Equip(req.body)

    try {
        const savedEquip = await newEquip.save();
        console.log(savedEquip)
        try {
            await Lab.findByIdAndUpdate(labId, {$push: {equipments : savedEquip._id}})
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedEquip)
    } catch (err) {
        next(err);
    }
}

export const getEquip = async (req,res,next) => {
    try {
        const equip = await Equip.findById(req.params.equipid);
        console.log(equip)
        res.status(200).json(equip);
    } catch (err){
        next(err);
    }
}