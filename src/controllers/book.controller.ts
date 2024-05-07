import { Request, Response, NextFunction } from "express";
import { IBOOK } from "../interface/index";
import { bookService } from "../services/index";
import { Book, Author, Category } from "../models/index";
const bookServiceObject: bookService = new bookService();
export class bookControllers {
  async getBooksController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const books: IBOOK[] = await bookServiceObject.getBooks(page,limit);
      res.status(200).json(books);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async getBookController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.json({ Message: "Book-ID not found" });
        return;
      }
      const book: IBOOK | object = await bookServiceObject.getBook(id);
      res.json(book);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
  async createBookController(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) {
        res.json({ Message: "Request body not found" });
        return;
      }
      const newBook: IBOOK = await bookServiceObject.createBook(req.body);
      res.status(200).json(newBook);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
  async updateBookController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.json({ Message: "Id not found" });
        return;
      }
      const updatedBook: IBOOK | object = await bookServiceObject.updateBook(
        id,
        req.body
      );
      res.json(updatedBook);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
  async deleteBookController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.json({ Message: "Id not found" });
      return;
    }

    try {
      const book: object = await bookServiceObject.deleteBook(id);
      res.json(book);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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

      console.log("hi");
      const filteredResults =
        await bookServiceObject.getBooksSearchingFiltering(
          authorName,
          categoryName,
          search,
          page,
          limit
        );
      console.log(filteredResults);
      res.json(filteredResults);
    } catch (error: any) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
