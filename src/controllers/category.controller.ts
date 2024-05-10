import { Request, Response, NextFunction } from "express";
import { ICATEGORY } from "../interface/index";
import { categoryService } from "../services/index";
import { ErrorHandler, customError } from "../errorsHandlers/error";
import { responseError,server_Error } from "../utils/responseError";
const categoryServiceObject: categoryService = new categoryService();
export class categoryControllers {
  async getCategoriesController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const category: any = req.query.category;
      const categories: ICATEGORY[] = await categoryServiceObject.getCategories(
        page,
        limit,
        category
      );
      res.status(200).json(categories);
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async getCategoryController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message="Category-ID not found" ;
        res.json(new ErrorHandler(message,404));
        return;
      }
      const category: ICATEGORY | object = await categoryServiceObject.getCategory(id);
      if (category instanceof ErrorHandler) {
        res.status(category.statusCode).json((responseError(category.message, category, false)));
        return;
      } else {
        res.json(category);
        return
      }
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async createCategoryController(req: Request, res: Response): Promise<void> {
    try {
      const newCategory: ICATEGORY = await categoryServiceObject.createCategory(
        req.body
      );
      res.status(200).json(newCategory);
      return;
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async updateCategoryController(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const message = "Id not found"
        res.json(new ErrorHandler(message, 404));
        return;
      }
      const updatedCategory: ICATEGORY | object = await categoryServiceObject.updateCategory(id, req.body);
      if (updatedCategory instanceof ErrorHandler) {
        res.status(updatedCategory.statusCode).json((responseError(updatedCategory.message, updatedCategory, false)));
        return;
      } else {
        res.json(updatedCategory);
        return
      }
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
  async deleteCategoryController(req: Request, res: Response): Promise<void> {

    try {
      const { id } = req.params;
      if (!id) {
        const message = "Id not found"
        res.json(new ErrorHandler(message, 404));
        return;
      }
      const category: object = await categoryServiceObject.deleteCategory(id);
      if (category instanceof ErrorHandler) {
        res.status(category.statusCode).json((responseError(category.message, category, false)));
        return;
      } else {
        res.json(category);
        return
      }
    } catch (error: any) {
      const resp=server_Error(error);
      res.status(500).json(resp);
      return;
    }
  }
}
