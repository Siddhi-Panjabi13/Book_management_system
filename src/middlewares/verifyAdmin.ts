import { Request,Response,NextFunction } from "express";
import { IUSER, Request1 } from "../interface/index";
const verifyAdmin = async (req:Request, res:Response, next:NextFunction) => {
    const user:IUSER|null = (req as Request1).user;
    
    if(user){
        if (user.role === 'Admin') {
            // res.json({ "message": "Yes you can add the product" });
            next();
        }
        else {
            res.json({ "message": "You donot have this right" })
        }
    }
    else{
        res.json({ "message": "User not found" })
    }
   

}
export default  verifyAdmin 