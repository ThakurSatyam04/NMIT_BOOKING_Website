import User from "../models/User.js"

export const updateUser = async (req,res,next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(updateUser);
    } 
    catch (err) {
        next(err);
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req,res,next) => {
    try {
        const users = await User.findById( req.params.id );
        res.status(200).json(users);
        console.log(users)
    } catch (err) {
        next(err);
    }
}

export const getAllUser = async (req,res,next) => {
    const {...others} = req.query;
    try {
        const users = await User.find({
            ...others,
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}