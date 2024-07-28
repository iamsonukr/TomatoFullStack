import foodModel from '../models/food.model.js'
import fs from 'fs'


// functon to add food 
const addFood = async (req, res) => {
    // geting image filename
    let image_filename= `${req.file.filename}`

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })

    try {
        await food.save(),
        console.log(food)
        res.json({success:true,message:"food added"})
        
    } catch (e) {
        console.log(e)
        res.json({success:false,message:"food adding failed"})

    }
}

// function to list food
const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,data:error})
    }
}

//function to remove food
const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        if(food.image){
            fs.unlink(`uploads/${food.image}`,()=>{})
        }
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

export {addFood,listFood,removeFood}