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
                date: Date,
                fromTime: String,
                toTime: String,
                userDetails: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                 },
                // {
                //     type: String,
                //     enum : ['pending', 'available', 'unavailable'],
                //     default: 'pending'
                // }
            }
        ],
        status : {
            type: String,
            default: 'available'
        }
        // slots : {
        //     type: [String]
        // }
    }, 
    {timestamps: true}
)

export default mongoose.model("Equipment", EquipSchema)