import Equip from "../models/Equip.js";
import Lab from "../models/Lab.js"
import jwt from "jsonwebtoken"

export const createLab = async (req,res,next) => {
    const newLab = new Lab(req.body);
    try {
        const savedLab = await newLab.save();
        res.status(200).send(savedLab);
        // res.send({message:"Equipment added successfully"})
        console.log(savedLab)
    } 
    catch (err) {
        next(err);
    }
}

export const updateLab = async (req,res,next) => {
    try {
        const updateLab = await Lab.findByIdAndUpdate(
            req.params.id,
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(updateLab);
    } 
    catch (err) {
        next(err);
    }
}

export const deleteLab = async (req,res,next) => {
    try {
        await Lab.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Lab has been deleted")
    } catch (err) {
        next(err);
    }
}

export const getLab = async (req,res,next) => {
    // const token = req.cookies.jwt;
    // console.log(req.cookie.jwt)
    // console.log(`This is the cookie of login ${req.cookies.jwt}`)
    try {
        const labs = await Lab.findById( req.params.id );
        res.status(200).json(labs); 
    } catch (err) {
        next(err);
    }
}

export const getAllLab = async (req,res,next) => {
    const {...others} = req.query;
    try {
        const labs = await Lab.find({
            ...others,
        });
        res.status(200).json(labs);
    } catch (err) {
        next(err);
    }
}

export const getEquips = async (req,res,next) => {
    try {
        const lab = await Lab.findById(req.params.id);
        const list = await Promise.all(
            lab.equipments.map(async (equip) => {
                return Equip.findById(equip)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const updateEquips = async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.id);
  
      for (const equip of lab.equipments) {
        await Equip.findByIdAndUpdate(equip, req.body, { new: true });
      }
  
    //   const updatedList = await Promise.all( 
    //     lab.equipments.map(async (equip) => {
    //       return Equip.findById(equip);
    //     })
    //   );
  
    //   res.status(200).json(updatedList);
    } catch (err) {
      next(err);
    }
  };
  


