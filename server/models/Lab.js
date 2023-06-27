import mongoose from "mongoose"

const LabSchema = new mongoose.Schema(
    {
        labName: {
            type: String,
            required: true,
        },
        labNo: {
            type: Number,
            required: true,
        },
        labIncharge: {
            type: String,
            required: true
        },
        contact: {
            type: Number,
            required:true
        },
        email: {
            type: String,
            required: true
        },
        department: {
            type: String,
        },
        equipments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
        }],
        featured:{
            type: Boolean,
            default: false
        }
    }, 
    {timestamps: true}
)

export default mongoose.model("Lab", LabSchema)