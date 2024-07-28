import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://victoriastark357:QK15LE0VqavMFLtH@clusterfortomatp.janldjx.mongodb.net/TomatoFullStack')
        .then(()=>{
            console.log("DB CONNECTED")
        })
    }
    catch{
        console.log('Error connecting database')
    }

}

export default connectDB