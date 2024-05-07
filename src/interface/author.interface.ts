import mongoose,{Document} from "mongoose";

interface IAUTHOR extends Document{
    authorName: string;
    biography:string;
    nationality:string;
    createdAt?:Date;
    updatedAt?:Date
}
export default IAUTHOR;