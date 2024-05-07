import { Request, Response } from "express";
import { userService } from "../services/index";
import { IUSER,Request1 } from "../interface/index";
import { revokedTokens } from "../middlewares/index";
const userServiceObject: userService = new userService();
export class userControllers {
  async getUsersController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const role:any= req.query.role;
      const users: IUSER[] = await userServiceObject.getUsers(page, limit,role);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async createUserController(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) {
        res.json({ "Message": "Request body not found..." });
        return
      }
      else {
        const user: IUSER = await userServiceObject.createUser(req.body);
        res.status(200).json(user);
        return
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return
    }
  };
  async loginUserController(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) {
        res.json({ "Message": "No request body found" });
        return
      }
      const username: string = req.body.userName;
      const password: string = req.body.password
      const logindata: object = await userServiceObject.loginUser(username, password);
      res.json(logindata);
      return
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return
    }
  };

  async getUserController(req: Request, res: Response): Promise<void> {
    try {
      console.log("here");
      
      const requestUser: IUSER|null=(req as Request1).user
      if(requestUser){
        const id:string  =await requestUser._id;
        console.log("id",id)
      const user: IUSER | object = await userServiceObject.getUser(id);
      res.status(200).json(user);
      }
      else{
        const message={"Message":"User not found..."};
        res.json(message);
      }
      
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  async logoutUserController(req:Request, res:Response){
    const token = req.headers['x-access-token'];
    if (token) {
        revokedTokens.add(token);
        res.json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'Token not provided' });
    }
};


}
