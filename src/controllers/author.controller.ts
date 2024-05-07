import { Request, Response, NextFunction } from "express";
import { IAUTHOR } from "../interface/index";
import { authorService } from "../services/index";
const authorServiceObject: authorService = new authorService();
export class authorControllers {
  async getAuthorsController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const search:any=req.query.search;
      const nationality:any=req.query.nationality;
      const authors: IAUTHOR[] =
        await authorServiceObject.getAuthors(page,limit,nationality,search);
      res.status(200).json(authors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
    async getAuthorController(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        if (!id) {
           res.json({ Message: "Author-ID not found" });
           return
        }
        const author: IAUTHOR| object = await authorServiceObject.getAuthor(id);
         res.json(author);
         return
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        return
      }
    }
  async createAuthorController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      if (!req.body) {
         res.json({ Message: "Request body not found" });
         return
      }
      const newAuthor: IAUTHOR = await authorServiceObject.createAuthor(
        req.body
      );
       res.status(200).json(newAuthor);
       return
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return
    }
  }
  async updateAuthorController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
         res.json({ Message: "Id not found" });
         return
      }
      const updatedAuthor: IAUTHOR | object =
        await authorServiceObject.updateAuthor(id, req.body);
       res.json(updatedAuthor);
       return
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return
    }
  }
  async deleteAuthorController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
       res.json({ Message: "Id not found" });
       return
    }

    try {
      const author: object = await authorServiceObject.deleteAuthor(id);
       res.json(author);
       return
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return
    }
  }
}
