import { Request, Response, NextFunction } from "express";
import { IAUTHOR } from "../interface/index";
import { authorService } from "../services/index";
import { ErrorHandler } from "../errorsHandlers/error";
import { responseError,server_Error } from "../utils/responseError";
const authorServiceObject: authorService = new authorService();
export class authorControllers {
  async getAuthorsController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const search: any = req.query.search;
      const nationality: any = req.query.nationality;
      const authors: IAUTHOR[] =
        await authorServiceObject.getAuthors(page, limit, nationality, search);
      res.json(authors);
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async getAuthorController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message = "Author-ID not found"
        res.json(new ErrorHandler(message, 404));
        return
      }
      const author: IAUTHOR | object = await authorServiceObject.getAuthor(id);
      if (author instanceof ErrorHandler) {
        res.status(author.statusCode).json((responseError(author.message, author, false)));
        return
      }
      res.json(author);
      return
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async createAuthorController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newAuthor: IAUTHOR = await authorServiceObject.createAuthor(
        req.body
      );
      res.status(200).json(newAuthor);
      return
    } catch (error: any) {
      let resp=server_Error(error);
      if(error.code==11000){
        resp= 'Please be unique cause author already exist'
     }
      res.status(500).json(resp);
      return;
    }
  }
  async updateAuthorController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message = "Id not found"
        res.json(new ErrorHandler(message, 404));
        return
      }
      const updatedAuthor: IAUTHOR | object =
        await authorServiceObject.updateAuthor(id, req.body);
      if (updatedAuthor instanceof ErrorHandler) {
        res.status(updatedAuthor.statusCode).json(responseError(updatedAuthor.message, updatedAuthor, false))
        return;
      }
      res.json(updatedAuthor);
      return
    } catch (error: any) {
      let resp=server_Error(error);
      if(error.code==11000){
        resp= 'Please be unique cause author already exist'
     }
      res.status(500).json(resp);
      return;
    }
  }
  async deleteAuthorController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      const message = "Id not found"
      res.json(new ErrorHandler(message, 404));
      return
    }

    try {
      const author: object = await authorServiceObject.deleteAuthor(id);
      if (author instanceof ErrorHandler) {
        res.status(author.statusCode).json(responseError(author.message, author, false))
        return;
      }
      res.json(author);
      return
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
}
