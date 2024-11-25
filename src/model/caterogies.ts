import { Schema, model } from "mongoose";
import { Icategory } from "../interface/category.interface";



const categorySchema = new Schema<Icategory>({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
  versionKey: false,
});

const Category = model<Icategory>('Category', categorySchema);

export default Category;
