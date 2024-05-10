import { Request,Response,NextFunction } from "express";
import { IUSER, Request1 } from "../interface/index";
import { ErrorHandler } from "../errorsHandlers/error";
import { responseError } from "../utils/responseError";
const verifyAdmin = async (req:Request, res:Response, next:NextFunction) => {
    const user:IUSER|null = (req as Request1).user;
    
    if(user){
        if (user.role === 'Admin') {
            // res.json({ "message": "Yes you can add the product" });
            next();
        }
        else {
            const message= "You donot have this right"
            const error=new ErrorHandler(message,401)
            res.status(error.statusCode).json(responseError(message,error,false));
            return
        }
    }
    else{
        const message="User not found"
        const error=new ErrorHandler(message,401)
            res.status(error.statusCode).json(responseError(message,error,false));
            return
    }
   

}
export default  verifyAdmin 