import mongoose from "mongoose"

const EquipSchema = new mongoose.Schema(
    {
        equipName: {
            type: String,
            required: true,
        },
        makeOfEquip: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required:true
        },
        slots: [
            {
                unavailableDates: {type: [Date]},
                unavailableTimeSlots : {type: [Date]}
            }
        ]
    }, 
    {timestamps: true}
)

export default mongoose.model("Equipment", EquipSchema)