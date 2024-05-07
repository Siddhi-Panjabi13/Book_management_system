import { IBOOK } from "../interface";
import { Book } from "../models";

export class bookQueries {
  async getBooksQuery(page:number,limit:number,length:number): Promise<IBOOK[]> {
    const totalPage = Math.ceil(length / limit);
    if (page > totalPage) {
      page = totalPage;
    }
    if (page < 1) {
      page = 1;
    }

    const startingIndex = (page - 1) * limit;
    return await Book.find({}).limit(limit).skip(startingIndex);
  }
  async getBookQuery(id: string): Promise<IBOOK | null> {
    return await Book.findById(id);
  }
  async createBookQuery(body: IBOOK): Promise<IBOOK> {
    return await Book.create(body);
  }
  async updateBookQuery(id: string, body: IBOOK): Promise<IBOOK | null> {
    const book = await Book.findByIdAndUpdate(id, body);
    return book;
  }
  async deleteBookQuery(id: string): Promise<IBOOK | null> {
    return await Book.findByIdAndDelete(id);
  }
  async findBookByAuthor(id: string): Promise<IBOOK[] | null> {
    return await Book.find({ authorId: id });
  }
  async findBookByCategory(id: string): Promise<IBOOK[] | null> {
    return await Book.find({ categoryId: id });
  }
  async deleteOneBookByAuthor(id: string): Promise<void> {
    await Book.deleteOne({ authorId: id });
  }
  async deleteOneBookByCategory(id: string): Promise<void> {
    await Book.deleteOne({ categoryId: id });
  }
  async findByQuery(
    query: object,
    page: number,
    limit: number,
    length: number
  ) {
    const totalPage = Math.ceil(length / limit);
    if (page > totalPage) {
      page = totalPage;
    }
    if (page < 1) {
      page = 1;
    }

    const startingIndex = (page - 1) * limit;
    return await Book.find(query)
      .limit(limit)
      .skip(startingIndex)
      .populate("authorId")
      .populate("categoryId")
      .exec();
  }
}
