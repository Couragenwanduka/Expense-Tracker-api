import { Schema, model , Types} from "mongoose";

interface Expense {
    user: Types.ObjectId;
    caterogy: Types.ObjectId;
    name: string;
    totalUnit: number;
    pricePerUnit: number;
}

const expenseSchema = new Schema<Expense>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caterogy:{
        type: Schema.Types.ObjectId,
        ref: 'Caterogies',
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
    pricePerUnit:{
        type: Number,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
  
}
)

const Expenses = model<Expense>('Expense', expenseSchema);

export default Expenses;