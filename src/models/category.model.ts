import mongoose,{Document, Model, Schema} from "mongoose";
import { ICATEGORY } from "../interface/index";

const categorySchema:Schema<ICATEGORY>=new Schema(
    {
        categoryName:{
            type:String,
            required:[true,'Category name is required'],
            unique:true
        }
    },
    {timestamps:true})

type categoryModel=Model<ICATEGORY>;
const Category:categoryModel=mongoose.model<ICATEGORY>('Category',categorySchema);

export default Category;