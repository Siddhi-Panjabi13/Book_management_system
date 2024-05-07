import mongoose,{Document, Schema, Model} from "mongoose";
import { IBOOK } from "../interface/index";
    const bookSchema:Schema<IBOOK>=new Schema(
        {
            title:{
                type:String,
                required:[true,'Book name is required...']
            },
            authorId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Author",
                required:[true,'AuthorId is required...']
            },
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Category',
                required:[true,'CategoryId is required...']
            },
            ISBN:{
                type:Number,
                required:[true,'ISBN number is required...'],
                unique:true
            },
            description:{
                type:String,
                required:false
            },
            price:{
                type:Number,
                required:[true,'Price is required...']
            }
        }
        
        ,{timestamps:true});
type bookModel=Model<IBOOK>;
const Book:bookModel=mongoose.model<IBOOK>('Book',bookSchema)

export default Book;
