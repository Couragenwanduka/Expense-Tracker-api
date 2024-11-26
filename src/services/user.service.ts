import User from "../model/user";
import { Iuser } from "../interface/user";
import { hashPassword } from "../utils/bcrypt";
import { getCountryData } from "../utils/countries";

export const saveUser = async (user:Partial<Iuser>):Promise<void | null> => {
    try{
       const hashedPassword = await hashPassword(user.password!)
       const response = await getCountryData(user.country!);
       if (!response) {
        throw new Error(`Unable to fetch country data for: ${user.country}`);
      }
       const users = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        country: response.currencyName,
        currency: response.currencySymbol,
        flag: response.flagUrl,
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

export const findUserById = async (id: string):Promise<any | null> => {
    try{
        const user = await User.findById(id).exec()
        return user
    }catch(error){
        console.error('Error finding user by id', error);
        return null;
    }
}