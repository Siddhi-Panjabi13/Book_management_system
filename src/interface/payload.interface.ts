import {Document} from 'mongoose';

interface IPAYLOAD extends Document{
    uid:string,
    uname:string,
}
export default IPAYLOAD;