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
        totalQuantity : {
            type:Number,
            required:true,
        },
        quantity: {
            type: Number,
            // required:true
        },
        slots: [
            {
                date: Date,
                fromTime: String,
                toTime: String,
                name:String,
                email:String,
                slotStatus:{
                    type:String,
                    default:'Pending'
                }
            }
        ],
        status : {
            type: String,
            default: 'available'
        }
    }, 
    {timestamps: true}
)


export default mongoose.model("Equipment", EquipSchema)