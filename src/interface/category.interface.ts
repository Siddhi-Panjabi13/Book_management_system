import mongoose,{Document} from "mongoose";

interface ICATEGORY extends Document{
    categoryName:string;
    createdAt?:Date;
    updatedAt?:Date
}
export default ICATEGORY