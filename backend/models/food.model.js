import mongoose, { Schema } from "mongoose";

// you created a schema
const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true}
})

// now you create a model using the schema

// cheking if the model already exist or not  (mongoose.models.food )
const foodModel=mongoose.models.food || mongoose.model('food',foodSchema)

export default foodModel


