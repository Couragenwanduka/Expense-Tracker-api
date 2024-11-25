import { NextFunction, Request, Response } from "express";
import { saveUser, findUserByEmail } from "../services/user.service";
import { comparePassword } from "../utils/bcrypt";
import BadRequest from "../error/error";
import { Iuser } from "../interface/user";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const createUser = async( req:Request, res:Response, next:NextFunction ): Promise<void> => {
    try{
        const { firstName, lastName, email, password, age, gender, dateofbirth, yearlyIncome }:Iuser = req.body;

        const exisitingUser = await findUserByEmail(email)
        if(exisitingUser){
            throw new BadRequest('Email already exists');
        }

        const user: Iuser = { firstName, lastName, email, password, age, gender, dateofbirth, yearlyIncome };
        await saveUser(user);

        res.status(201).json({message: 'user saved successfully'});
    }catch(error){
       next(error)
    }
}

export const login = async (req:Request, res:Response, next:NextFunction):Promise <void> => {
    try{
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if(!user){
            throw new BadRequest('Invalid email or password');
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            throw new BadRequest('Invalid email or password');
        }

        const accessToken = await generateAccessToken(user.id)
        const refreshToken = await generateRefreshToken(user.id)

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            secure: process.env.NODE_ENV === 'production',
            // SameSite: 'strict'  // recommended for production environments
        });

        res.json({message: 'Logged in successfully', accessToken});
    }catch(error){
        next(error)
    }
}

