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

// NOT TESTED

// function to update food
// const updateFood = async (req, res) => {
//     const { id, name, description, price, category } = req.body;
//     let updatedFields = { name, description, price, category };

//     if (req.file && req.file.filename) {
//         const food = await foodModel.findById(id);
//         if (food.image) {
//             fs.unlink(`uploads/${food.image}`, () => {});
//         }
//         updatedFields.image = req.file.filename;
//     }

//     try {
//         const updatedFood = await foodModel.findByIdAndUpdate(id, updatedFields, { new: true });
//         if (!updatedFood) {
//             return res.status(404).json({ success: false, message: "Food not found" });
//         }
//         res.json({ success: true, message: "Food updated", data: updatedFood });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Food update failed" });
//     }
// }

// export { addFood, listFood, removeFood, updateFood };

export {addFood,listFood,removeFood}