import { Request, Response, NextFunction } from "express";
import { ICATEGORY } from "../interface/index";
import { categoryService } from "../services/index";
const categoryServiceObject: categoryService = new categoryService();
export class categoryControllers {
  async getCategoriesController(req: Request, res: Response): Promise<void> {
    try {
      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 4;
      const category:any=req.query.category;
      const categories: ICATEGORY[] =
        await categoryServiceObject.getCategories(page,limit,category);
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
    async getCategoryController(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        if (!id) {
          res.json({ Message: "Category-ID not found" });
          return
        }
        const category: ICATEGORY| object = await categoryServiceObject.getCategory(id);
         res.json(category);
         return
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        return
      }
    }
  async createCategoryController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      if (!req.body) {
         res.json({ Message: "Request body not found" });
         return
      }
      const newCategory: ICATEGORY = await categoryServiceObject.createCategory(
        req.body
      );
      res.status(200).json(newCategory);
      return
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return
    }
  }
  async updateCategoryController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
         res.json({ Message: "Id not found" });
         return
      }
      const updatedCategory: ICATEGORY | object =
        await categoryServiceObject.updateCategory(id, req.body);
      res.json(updatedCategory);
      return
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return
    }
  }
  async deleteCategoryController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
       res.json({ Message: "Id not found" });
       return
    }

    try {
      const category: object = await categoryServiceObject.deleteCategory(id);
       res.json(category);
       return
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return
    }
  }
}
