import { Types } from "mongoose";

export interface Iexpense {
    user: Types.ObjectId;
    category: Types.ObjectId;
    name: string;
    totalUnit: number;
    price: number;
    date:Date
}