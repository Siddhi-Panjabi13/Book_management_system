import mongoose, { Document } from "mongoose";

interface IBOOK extends Document {
  title: string;
  authorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  ISBN: number;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export default IBOOK;
