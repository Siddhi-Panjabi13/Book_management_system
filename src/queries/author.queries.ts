import { Author } from "../models";
import { IAUTHOR } from "../interface";

export class authorQueries {
  async getAuthorsQuery(page:number,limit:number,length:number,query:any): Promise<IAUTHOR[]> {
    const totalPage:number=Math.ceil(length/limit);
    if (page > totalPage) {
      page = totalPage;
    }
    if (page < 1) {
      page = 1;
    }
    const startingIndex:number=(page-1)*limit;
    return await Author.find(query).limit(limit).skip(startingIndex);
  }
  async getAuthorQuery(id: string): Promise<IAUTHOR | null> {
    return await Author.findById(id);
  }
  async createAuthorQuery(body: IAUTHOR): Promise<IAUTHOR> {
    return await Author.create(body);
  }
  async updateAuthorQuery(id: string, body: IAUTHOR): Promise<IAUTHOR | null> {
    const author = await Author.findByIdAndUpdate(id, body);
    return author;
  }
  async deleteAuthorQuery(id: string): Promise<IAUTHOR | null> {
    return await Author.findByIdAndDelete(id);
  }
  async deleteOneAuthor(id:string):Promise<void>{
     await Author.deleteOne({_id:id});
  }
  async findOneByAuthorName(name:string){
    return await Author.findOne({ authorName: name });

  }
}
