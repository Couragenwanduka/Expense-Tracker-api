import User from "../model/user";
import { Iuser } from "../interface/user";
import { hashPassword } from "../utils/bcrypt";

export const saveUser = async (user: Iuser):Promise<void | null> => {
    try{
       const hashedPassword = await hashPassword(user.password)
       const users = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        age: user.age,
        gender: user.gender,
        dateofbirth: user.dateofbirth,
        yearlyIncome: user.yearlyIncome,
       })
       await users.save()
    }catch(error){
        console.error('Error creating user', error);
        return null;
    }
}

export const findUserByEmail = async (email: string):Promise<any | null> => {
    try{
        const user = await User.findOne({email}).exec()
        return user
    }catch(error){
        console.error('Error finding user by email', error);
        return null;
    }
}