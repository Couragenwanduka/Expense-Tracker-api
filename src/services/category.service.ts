import Category from "../model/caterogies";
import { Icategory } from "../interface/category.interface";

export const saveCategory = async(category:Icategory): Promise<void | null> => {
    try{
        const saveCategory =  new Category({
            name: category.name,
            description: category.description,
            isDefault: category.isDefault
        })
        saveCategory.save()
    }catch(error){
        console.error("Error saving category", error)
        return null
    }
}

export const findingCategory = async(name:string): Promise<Icategory|null> => {
    try{
        const cat = await Category.findOne({name})
        return cat
    }catch(error){
        console.error('Error finding Category', error)
        return null
    }
}

export const findingCategoryById = async(id:string): Promise<Icategory|null> => {
    try{
        const cat = await Category.findOne({_id:id})
        return cat
    }catch(error){
        console.error('Error finding Category', error)
        return null
    }
}

export const updateCategory = async(id:string,category:Icategory): Promise<Icategory|null> => {
   try{
       const update = await Category.findByIdAndUpdate(id, category, { new:true } )
       return update
   }catch(error){
       console.error('Error occurred updating Category', error)
       return null
   }
}

export const deleteCategory = async (id:string):Promise<null | Icategory> => {
    try{
        const category = await Category.findOneAndDelete({_id:id})
        return category
    }catch(error){
        console.error('Error occured deleteing Category', error)
        return null
    }
}