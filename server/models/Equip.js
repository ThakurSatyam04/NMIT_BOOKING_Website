import mongoose from "mongoose"

const EquipSchema = new mongoose.Schema(
    {
        equipName: {
            type: String,
            required: true,
        },
        makeOfEquip: {
            type: Number,
            required: true,
        },
        model: {
            type: String,
            required: true
        },
        Quantity: {
            type: Number,
            required:true
        },
    }, 
    {timestamps: true}
)

export default mongoose.model("Equipment", EquipSchema)