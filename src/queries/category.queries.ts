import { Category } from "../models/index";
import { ICATEGORY } from "../interface/index";
export class categoryQueries {
  async getCategoriesQuery(
    page: number,
    limit: number,
    length: number,
    query:any
  ): Promise<ICATEGORY[]> {
    console.log(query)
    const startingIndex: number = (page - 1) * limit;
    const totalPage: number = Math.ceil(length / limit);
    if (page > totalPage) {
      page = totalPage;
    }
    if (page < 1) {
      page = 1;
    }
    return await Category.find(query).limit(limit).skip(startingIndex).exec();
  }
  async getCategoryQuery(id: string) {
    return await Category.findById(id);
  }
  async createCategoryQuery(body: ICATEGORY): Promise<ICATEGORY> {
    return await Category.create(body);
  }
  async updateCategoryQuery(
    id: string,
    body: ICATEGORY
  ): Promise<ICATEGORY | null> {
    return await Category.findByIdAndUpdate(id, body);
  }
  async deleteCategoryQuery(id: string): Promise<ICATEGORY | null> {
    return await Category.findByIdAndDelete(id);
  }
  async deleteOneCategory(id: string): Promise<void> {
    await Category.deleteOne({ _id: id });
  }
  async findOneCategoryByName(name: string) {
    return await Category.findOne({ categoryName: name });
  }
}
