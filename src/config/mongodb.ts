import mongoose from 'mongoose'

const connectDb = async():Promise<void> => {
    try{
        const connection = await mongoose.connect(process.env.mongoDb!)
        console.log('Connected to MongoDB')
    }catch(error:any){
        console.error('Error connecting to MongoDB', error)
        process.exit(1)
    }
}

export default connectDb