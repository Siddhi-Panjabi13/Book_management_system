import bcrypt from "bcrypt";
import { User } from "../models/index";
import jwt from "jsonwebtoken";
import { IUSER } from "../interface/index";
import { userQueries } from "../queries/index";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY || "";
const userQueriesObj: userQueries = new userQueries();
export class userService {
  async getUsers(page: number, limit: number, role: any): Promise<IUSER[]> {
    const length: number = await User.countDocuments();
    const query: any = {};
    if (role) {
      query.role = role;
    }
    return await userQueriesObj.getUsersQuery(page, limit, length,query);
  }
  async createUser(userData: IUSER): Promise<IUSER> {
    const salt = 10;
    const hashedpassword: string = bcrypt.hashSync(userData.password, salt);
    const req1 = {
      userName: userData.userName,
      role: userData.role,
      password: hashedpassword,
    };
    return await userQueriesObj.createUserQuery(req1 as IUSER);
  }

  async loginUser(user_name: string, password: string): Promise<object> {
    const user: IUSER | null = await userQueriesObj.findOneUserQuery(user_name);
    if (!user) {
      return { message: "User not found" };
    }
    const matchpassword: boolean = bcrypt.compareSync(password, user.password);
    if (!matchpassword) {
      const message = { message: "No user has such password" };
      return message;
    } else {
      // Token on emailid
      const payload: object = { uname: user_name, uid: user._id };
      const token: string = jwt.sign(payload, secretKey, { expiresIn: 1200 });
      console.log(token, user);

      return {
        token: token,
        password: password,
        user_name: user_name,
      };
    }
  }

  async getUser(id: string): Promise<IUSER | object> {
    return await userQueriesObj.getUserQuery(id);
  }
}
