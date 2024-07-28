import { addFood, listFood, removeFood } from '../controllers/food.controller.js';
import express from 'express';
import multer from 'multer'

// create a router 
const foodRouter=express.Router()

//image storage engine
const storage =multer.diskStorage({
    // Directory to store uploaded images
    destination:"uploads", 
    // Generating a unique filename by appending timestamp to the original filename
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
// Configuring multer with the storage engine
const multerUpload = multer({storage:storage})

// Defining the POST route for adding food items
// multer is only putting the image in the folder you selected.... it has nothing to do with the database. For that you are
// Image upload is first received by the multer than it is renamed with unique name and the the name is passed to the addFood function as a req.file.filename
foodRouter.post('/addfood',multerUpload.single('image'),addFood)

//route to list food
foodRouter.get('/listfood',listFood)

//route ro remove food
foodRouter.post('/remove',removeFood)



export default foodRouter

