import mongoose,{Model, Schema, Document} from "mongoose";
import { IUSER } from "../interface/index";

const userSchema:Schema<IUSER>=new Schema(
    {
        userName:{
            type:String,
            required:[true,'Username is required...'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'Password is required...']
        },
        role:{
            type:String,
            required:true,
            enum:['Admin','Author']
        }
    },
    {timestamps:true})

    type userModel=Model<IUSER>
    const User:userModel=mongoose.model<IUSER>('User',userSchema);
    export default User;