import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        .then(()=>{
            console.log("DB CONNECTED")
        })
    }
    catch{
        console.log('Error connecting database')
    }

}

export default connectDB