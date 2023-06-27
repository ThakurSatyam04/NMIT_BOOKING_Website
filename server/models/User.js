import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userType:{
            type: String
        },
        // isAdmin: {
        //     type: Boolean,
        //     default: false
        // },
        tokens:[{
            token:{
                type: String,
                require:true
            }
        }]
    }, 
    {timestamps: true}
)
// Generating Token
UserSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(err){
        res.send("error in generating token"+err)
        console.log("error in generating token"+err)
    }
}

export default mongoose.model("User", UserSchema)