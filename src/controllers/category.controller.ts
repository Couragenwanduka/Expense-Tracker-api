import {saveCategory, findingCategory, updateCategory, deleteCategory, findingCategoryById }from '../services/category.service';
import { Response, Request, NextFunction } from 'express';
import BadRequest from '../error/error';
import {Icategory} from "../interface/category.interface"

// Create Category
export const createCategory = async(req:Request, res:Response, next:NextFunction) => {
   try{
    const {name, description, isDefault} = req.body;

    const exisitingCategoryName = await findingCategory(name)
    if(exisitingCategoryName){
        throw new BadRequest('Category already exists')
    }
    const category: Icategory = {
        name,
        description,
        isDefault
    }
    await saveCategory(category)
    res.status(200).send('Category saved successfully')
   }catch(error){
    next(error)
   }
}

export const updateCategories = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    try{
        const {id} = req.params;
        const {name, description, isDefault} = req.body;

        const category = await findingCategoryById(id)
        if(!category){
            throw new BadRequest('category not found')
        }

        let updatedCategory: Icategory = {...category}
        if (name) updatedCategory.name = name;
        if (description) updatedCategory.description = description;
        if (isDefault) updatedCategory.isDefault = isDefault

        await updateCategory(id,updatedCategory)

        res.status(201).send('update successfull')
    }catch(error){
        next(error)
    }
}

export const deleteACategory = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    try{
        const {id} = req.params;

        const category = await findingCategoryById(id)
        if(!category){
            throw new BadRequest('category not found')
        }

        if(category.isDefault === true){
            throw new BadRequest('Category can not be deleted')
        }

        await deleteCategory(id)
        
        res.status(200).send('Category deleted successfully')
    }catch(error){
        next(error)
    }

}