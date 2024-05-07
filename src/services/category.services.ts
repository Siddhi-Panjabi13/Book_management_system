import { ICATEGORY, IBOOK } from "../interface/index";
import { Category } from "../models";
import { categoryQueries, bookQueries } from "../queries/index";
const categoryQueriesObject = new categoryQueries();
const bookQueriesObject = new bookQueries();
export class categoryService {
  async getCategories(page:number,limit:number,category:string): Promise<ICATEGORY[]> {
    const length: number = await Category.countDocuments();
    const query:any={}
    if(category){
      query.categoryName=category
    }
    return await categoryQueriesObject.getCategoriesQuery(page,limit,length,query);
  }
  async getCategory(id: string): Promise<ICATEGORY | object> {
    const category: ICATEGORY | null =
      await categoryQueriesObject.getCategoryQuery(id);
    if (category) {
      return category;  
    } else {
      const message = { Message: "Category not found" };
      return message;
    }
  }
  async createCategory(body: ICATEGORY): Promise<ICATEGORY> {
    const newCategory: ICATEGORY =
      await categoryQueriesObject.createCategoryQuery(body);
    return newCategory;
  }
  async updateCategory(
    id: string,
    body: ICATEGORY
  ): Promise<ICATEGORY | object> {
    const category: ICATEGORY | null =
      await categoryQueriesObject.updateCategoryQuery(id, body);
    const updatedCategory: ICATEGORY | null =
      await categoryQueriesObject.getCategoryQuery(id);
    if (!updatedCategory) {
      const message = { Message: "Category not found" };
      return message;
    }
    return updatedCategory;
  }
  async deleteCategory(id: string): Promise<object> {
    let session;
    session = await Category.startSession();
    session.startTransaction();
    const books: IBOOK[] | null = await bookQueriesObject.findBookByCategory(
      id
    );

    if (!books) {
      const category: ICATEGORY | null =
        await categoryQueriesObject.getCategoryQuery(id);
      if (!category) {
        const message = { Message: "Category not found" };
        return message;
      }
      await categoryQueriesObject.deleteOneCategory(id);
      await session.commitTransaction();
      session.endSession();
      return { Message: "Category deleted successfully!!" };
    } else {
      for (const book of books) {
        await bookQueriesObject.deleteOneBookByCategory(id);
      }
      await categoryQueriesObject.deleteOneCategory(id);
      await session.commitTransaction();
      session.endSession();
      return { Message: "Category deleted successfully with its books!!" };
    }
  }
}
