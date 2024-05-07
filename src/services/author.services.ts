import { IAUTHOR, IBOOK } from "../interface/index";
import { authorQueries, bookQueries } from "../queries/index";
import { Author } from "../models/index";
const authorQueriesObject = new authorQueries();
const bookQueriesObject = new bookQueries();
export class authorService {
  async getAuthors(page:number,limit:number,nationality:any,search:any): Promise<IAUTHOR[]> {
    const length:number=await Author.countDocuments();
    const query:any={}
    if(nationality){
      query.nationality=nationality
    }
    if(search){
      const regex = new RegExp(search.toString(),'i')
            query.biography = {$regex:regex};
    }
    return await authorQueriesObject.getAuthorsQuery(page,limit,length,query);
  }
  async getAuthor(id: string): Promise<IAUTHOR | object> {
    const author: IAUTHOR | null = await authorQueriesObject.getAuthorQuery(id);
    if (author) {
      return author;
    } else {
      const message = { Message: "Author not found" };
      return message;
    }
  }
  async createAuthor(body: IAUTHOR): Promise<IAUTHOR> {
    const newAuthor: IAUTHOR = await authorQueriesObject.createAuthorQuery(
      body
    );
    return newAuthor;
  }
  async updateAuthor(id: string, body: IAUTHOR): Promise<IAUTHOR | object> {
    const author: IAUTHOR | null = await authorQueriesObject.updateAuthorQuery(
      id,
      body
    );
    const updatedAuthor: IAUTHOR | null =
      await authorQueriesObject.getAuthorQuery(id);
    if (!updatedAuthor) {
      const message = { Message: "Author not found" };
      return message;
    }
    return updatedAuthor;
  }
  async deleteAuthor(id: string): Promise<object> {
    let session;
    session = await Author.startSession();
    session.startTransaction();
    const books: IBOOK[] | null = await bookQueriesObject.findBookByAuthor(id);

    if (!books) {
      const author: IAUTHOR | null = await authorQueriesObject.getAuthorQuery(
        id
      );
      if (!author) {
        const message = { Message: "Author not found" };
        return message;
      }
      await authorQueriesObject.deleteOneAuthor(id);
      await session.commitTransaction();
      session.endSession();
      return { Message: "Author deleted successfully!!" };
    } else {
      for (const book of books) {
        await bookQueriesObject.deleteOneBookByAuthor(id);
      }
      await authorQueriesObject.deleteOneAuthor(id);
      await session.commitTransaction();
      session.endSession();
      return { Message: "Author deleted successfully with its books!!" };
    }
  }
}
