import { Request, Response } from "express";
import { userService } from "../services/index";
import { IUSER, Request1 } from "../interface/index";
import { revokedTokens } from "../middlewares/index";
import { ErrorHandler } from "../errorsHandlers/error";
import { responseError,server_Error } from "../utils/responseError";
const userServiceObject: userService = new userService();
export class userControllers {
  async getUsersController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const role: any = req.query.role;
      const users: IUSER[] = await userServiceObject.getUsers(
        page,
        limit,
        role
      );
      res.status(200).json(users);
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async createUserController(req: Request, res: Response): Promise<void> {
    try {
      
        const user: IUSER = await userServiceObject.createUser(req.body);
        res.status(200).json(user);
        return;
    } catch (error: any) {
      let resp=server_Error(error);
      if(error.code==11000){
        resp = 'Please be unique cause user already exists'
     }
      res.status(500).json(resp);
      return;
    }
  }
  async loginUserController(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.body.userName;
      const password: string = req.body.password;
      const logindata: object = await userServiceObject.loginUser(
        username,
        password
      );
      res.json(logindata);
      return;
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }

  async getUserController(req: Request, res: Response): Promise<void> {
    try {
      const requestUser: IUSER | null = (req as Request1).user;
      if (requestUser) {
        const id: string = await requestUser._id;
        const user: IUSER | object = await userServiceObject.getUser(id);
        res.status(200).json(user);
      } else {
        const message = { Message: "User not found..." };
        res.json(message);
      }
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async logoutUserController(req: Request, res: Response) {
    try {
      const token = req.headers["x-access-token"];
      if (token) {
        revokedTokens.add(token);
        res.json({ message: "Logout successful" });
      } else {
        const message="Token not provided"
        res.json(new ErrorHandler(message,400));
      }
    }
    catch (error) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
}
