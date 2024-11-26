import { Schema, model } from "mongoose";
import { Iuser } from "../interface/user";


const userSchema = new Schema<Iuser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    currency:{
       type: String,
       required: true
    },
    flag:{
        type: String,
        required:true
    },
    age:{
        type:Number,
        min:10,
        max:100
    },
    gender:{
        type:String,
        required:true,
        enum: ['Male', 'Female', 'Other']
    },
    dateofbirth:{
        type: Date,
    },
    yearlyIncome:{
        type: Number,
    }
},
  {
    timestamps: true,
    versionKey: false,
  }
);


userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

const User = model<Iuser>('User', userSchema)

export default User;