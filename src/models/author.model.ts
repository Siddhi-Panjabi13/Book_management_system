import mongoose, { Document, Schema, Model } from "mongoose";
import { IAUTHOR, IBOOK } from "../interface";

const authorSchema: Schema<IAUTHOR> = new Schema(
  {
    authorName: {
      type: String,
      required: [true, "Author name is required..."],
      unique: true,
    },
    biography: {
      type: String,
      required: [true, "Information about author is required..."],
    },
    nationality: {
      type: String,
      required: [true, "Author nationality is required..."],
    },
  },
  { timestamps: true }
);
type authorModel = Model<IAUTHOR>;
const Author: authorModel = mongoose.model<IAUTHOR>("Author", authorSchema);

export default Author;
