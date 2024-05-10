import { Request, Response, NextFunction } from "express";
import { IBOOK } from "../interface/index";
import { bookService } from "../services/index";
// import { Book, Author, Category } from "../models/index";
import { ErrorHandler } from "../errorsHandlers/error";
import { responseError,server_Error } from "../utils/responseError";
const bookServiceObject: bookService = new bookService();
export class bookControllers {
  async getBooksController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const books: IBOOK[] = await bookServiceObject.getBooks(page, limit);
      res.status(200).json(books);
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async getBookController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message = "Book-ID not found"
        res.json(new ErrorHandler(message, 404));
        return;
      }
      const book: IBOOK | object = await bookServiceObject.getBook(id);
      if (book instanceof ErrorHandler) {
        res.status(book.statusCode).json(responseError(book.message, book, false));
        return;
      }
      res.json(book);
      return;
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async createBookController(req: Request, res: Response): Promise<void> {
    try {
      const newBook: IBOOK = await bookServiceObject.createBook(req.body);
      res.status(200).json(newBook);
      return;
    } catch (error: any) {
      let resp=server_Error(error);
      if(error.code==11000){
        resp= 'Please be unique cause book already exist'
     }
      res.status(500).json(resp);
      return;
    }
  }
  async updateBookController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message = "Id not found"
        res.json(new ErrorHandler(message, 404));
        return;
      }
      const updatedBook: IBOOK | object = await bookServiceObject.updateBook(
        id,
        req.body
      );
      if (updatedBook instanceof ErrorHandler) {
        res.status(updatedBook.statusCode).json(responseError(updatedBook.message, updatedBook, false))
        return
      }
      res.json(updatedBook);
      return;
    } catch (error: any) {
      let resp=server_Error(error);
      if(error.code==11000){
        resp= 'Please be unique cause book already exist'
     }
      res.status(500).json(resp);
      return;
    }
  }
  async deleteBookController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      const message = "Id not found"
      res.json(new ErrorHandler(message, 404));
      return;
    }

    try {
      const book: object = await bookServiceObject.deleteBook(id);
      if (book instanceof ErrorHandler) {
        res.status(book.statusCode).json(responseError(book.message, book, false))
        return
      }
      res.json(book);
      return;
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }

  async getBooksControllerSearchingFiltering(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const query1 = req.query;
      const authorName: any = query1.authorName;
      const categoryName: any = query1.categoryName;
      const search: any = query1.search;

      const filteredResults =
        await bookServiceObject.getBooksSearchingFiltering(
          authorName,
          categoryName,
          search,
          page,
          limit
        );
      res.json(filteredResults);
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
}
