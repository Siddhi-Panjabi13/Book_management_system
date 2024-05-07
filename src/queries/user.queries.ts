import { User } from "../models/index"
import { IUSER } from "../interface/index"
export class userQueries {
    async getUsersQuery(page: number, limit: number, length: number,query:any): Promise<IUSER[]> {
        const totalPage = Math.ceil(length / limit);
        if (page > totalPage) {
            page = totalPage
        }
        if (page < 1) {
            page = 1;
        }

        const startingIndex = (page - 1) * limit;
        // console.log("length",length)

        const result = await User.find(query).limit(limit).skip(startingIndex).exec()
        return result;
    }
    async createUserQuery(req1: IUSER): Promise<IUSER> {
        return await User.create(req1)
    }
    async getUserQuery(id: string): Promise<IUSER | object> {
        const user:IUSER|null=await User.findById(id)
        if(!user){
            const message={"Message":"User not found"};
            return message
        }
        else{
            return user;
        }
    }
    
    
    async findOneUserQuery(user_name: string): Promise<IUSER | null> {
        return await User.findOne({ userName: user_name });
    }
}

