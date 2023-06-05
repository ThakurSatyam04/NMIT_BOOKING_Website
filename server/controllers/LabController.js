import Lab from "../models/Lab.js"

export const createLab = async (req,res,next) => {
    console.log(req.body)
    const newLab = new Lab(req.body);
    try {
        const savedLab = await newLab.save();
        res.status(200).json(savedLab);
        res.send({message:"Equipment added successfully"})
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