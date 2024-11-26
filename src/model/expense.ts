import { Schema, model} from "mongoose";
import { Iexpense } from "../interface/expense.interface";

const expenseSchema = new Schema<Iexpense>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    totalUnit:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
},
{
    timestamps: true,
    versionKey: false,
  
}
)

const Expenses = model<Iexpense>('Expense', expenseSchema);

export default Expenses;