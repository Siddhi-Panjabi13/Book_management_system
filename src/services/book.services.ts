import { IBOOK } from "../interface/index";
import { authorQueries, bookQueries, categoryQueries } from "../queries/index";
import { Book } from "../models/index";
import { ErrorHandler } from "../errorsHandlers/error";
const bookQueriesObject = new bookQueries();
const authorQueriesObject = new authorQueries();
const categoryQueriesObject = new categoryQueries();
export class bookService {
  async getBooks(page: number, limit: number): Promise<IBOOK[]> {
    const length: number = await Book.countDocuments();
    return await bookQueriesObject.getBooksQuery(page, limit, length);
  }
  async getBook(id: string): Promise<IBOOK | object> {
    const book: IBOOK | null = await bookQueriesObject.getBookQuery(id);
    if (book) {
      return book;
    } else {
      const message = "Book not found" ;
      return (new ErrorHandler(message,404));
    }
  }
  async createBook(body: IBOOK): Promise<IBOOK> {
    const newBook: IBOOK = await bookQueriesObject.createBookQuery(body);
    return newBook;
  }
  async updateBook(id: string, body: IBOOK): Promise<IBOOK | object> {
    const book: IBOOK | null = await bookQueriesObject.updateBookQuery(
      id,
      body
    );
    const updatedBook: IBOOK | null = await bookQueriesObject.getBookQuery(id);
    if (!updatedBook) {
      const message =  "Book not found" ;
      return (new ErrorHandler(message,404));
    }
    return updatedBook;
  }
  async deleteBook(id: string): Promise<object> {
    const book: IBOOK | null = await bookQueriesObject.deleteBookQuery(id);

    if (!book) {
      const message =  "Book not found" ;
      return (new ErrorHandler(message,404));
    } else {
      const message = { Message: "Book deleted successfully" };
      return message;
    }
  }
  async getBooksSearchingFiltering(
    authorName: string,
    categoryName: string,
    search: string,
    page: number,
    limit: number
  ) {
    let query: any = {};
    const length: number = await Book.countDocuments();
    if (authorName) {
      const author = await authorQueriesObject.findOneByAuthorName(authorName);
      if (author) {
        query.authorId = author._id;
      } else {
        const arr = [];
        return [];
      }
    }
    if (categoryName) {
      const category = await categoryQueriesObject.findOneCategoryByName(
        categoryName
      );
      if (category) {
        query.categoryId = category._id;
      } else {
        const arr: any = [];
        return arr;
      }
    }
    if (search) {
      const regex = new RegExp(search.toString(), "i");
      const searchCriteria = {
        $or: [{ title: regex }, { description: regex }],
      };
      query = { ...query, ...searchCriteria };
    }

    let findQuery = await bookQueriesObject.findByQuery(
      query,
      page,
      limit,
      length
    );
    const filteredResults = findQuery.filter((book) => {
      return book.authorId !== null && book.categoryId !== null;
    });
    return filteredResults;
  }
}
