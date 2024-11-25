import bcrypt from 'bcryptjs';

const hashPassword = async(password:string) => {
      try{
        const hash = await bcrypt.hash(password, 10);
        return hash;
      }catch(error){
        console.error('Error hashing password', error);
        return null;
      }
}

const comparePassword = async(password:string, dbPassword:string): Promise<boolean> => {
      try{
         const match = await bcrypt.compare(password, dbPassword)
         return match
      }catch(error){
        console.error('Error comparing password', error);
        return false;
      }
}

export { hashPassword, comparePassword };