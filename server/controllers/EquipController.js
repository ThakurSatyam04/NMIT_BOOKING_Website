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

export const updateEquip = async (req,res,next)=>{
    try{
        const equip = await Equip.findByIdAndUpdate(
            req.params.equipid,
            { $set : req.body },
            { new : true }
        );
        res.status(200).json(equip);
    }catch(err){
        next(err)
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

export const createSlot = async (req,res,next) => {
    try{
        const { date, fromTime, toTime, status } = req.body;
        const equipment = await Equip.findById(req.params.equipid);
        const newSlot = {
            date, fromTime, toTime, status
        }
        equipment.slots.push(newSlot);
        await equipment.save();
        res.status(201).json("slot created successfully")
    } catch(err){
        next(err);
    }
}

export const updateSlot = async (req,res,next) => {
    try {
        const { date, fromTime, toTime, status } = req.body;
        const { equipid, slotid } = req.params;

        const equipment = await Equip.findById(equipid);
        const slotIndex = equipment.slots.findIndex((slot) => slot._id.toString() === slotid);

        if(slotIndex === -1){
            return res.status(404).json("Slot not found");
        }

        equipment.slots[slotIndex].date = date;
        equipment.slots[slotIndex].fromTime = fromTime;
        equipment.slots[slotIndex].toTime = toTime;
        equipment.slots[slotIndex].status = status;

        await equipment.save();

        res.status(201).json("Slot updated successfully")

    } catch (error) {
        next(error);
    }
}

export const getSlots = async (req,res,next) => {
    try {
        const equipment = await Equip.findById(req.params.equipid);
        const slots = equipment.slots;
        res.status(200).json(slots);
      } catch (err) {
        next(err);
      }
}

export const getSlot = async (req,res,next) => {
    try {
        const { equipid, slotid } = req.params;
        const equipment = await Equip.findById(equipid);
        const slot = equipment.slots.find((slot) => slot._id.toString() === slotid);
    
        if (!slot) {
          return res.status(404).json('Slot not found' );
        }
    
        res.status(200).json(slot);
      } catch (error) {
        next(error);
      }
}

export const equipStatus = async (req,res,next) => {
    try {
        const { equipid } = req.params;
        const { status, quantity } = req.body;
    
        const equipment = await Equip.findByIdAndUpdate(
          equipid,
          { status, quantity },
          { new: true }
        );
    
        if (!equipment) {
          return res.status(404).json({ message: 'Equipment not found' });
        }
    
        res.status(200).json({ message: 'Equipment status updated successfully' });
      } catch (error) {
        next(error);
      }
}

export const deleteEquip = async (req,res,next) => {
    const labId = req.params.labid;
    try {
        await Equip.findByIdAndDelete(
            req.params.equipid
        )
        try {
            await Lab.findByIdAndUpdate(labId, {$pull: {equipments : req.params.equipid}})
        } catch (err) {
            next(err);
        }
        res.status(200).json("Equipment has been deleted")
    } catch (err) {
        next(err);
    }
}
