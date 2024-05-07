import mongoose,{Document} from 'mongoose';


interface IUSER extends Document{
    userName:string;
    password:string;
    role:string;
    createdAt?:Date;
    updateAt?:Date
}

export default IUSER