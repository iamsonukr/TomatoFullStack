import { response } from "express"
import cartModel from "../models/cart.model.js"
import userModel from "../models/user.model.js"


//fetch userCart data
const getUserCart=async(req,res)=>{

}

// add items to cart
const addToCart=async(req,res)=>{
    try {

        //each user has a cart associated with it ..... Fetching the exact user through id 
        let userData=await userModel.findOne({_id:req.body.userId})

        // geting the cart of the user
        let cartData= userData.cart;
        let itemId=req.body.itemId
        console.log(cartData)
         
        if(!cartData[itemId])
        {
            cartData[itemId]=1
            console.log(cartData[itemId])
        }
        else{
            cartData[itemId]+=1;
            console.log(cartData[itemId])
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cart:cartData});
        res.json({success:true,message:"Item added to cart of "+userData.name})
    } catch (error) {
        console.log(error)
        res.json({success:false,})
    }
}


// remove items from cart
const removeFromCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData= userData.cart
        let itemId=req.body.itemId

        if(cartData[itemId]>0){
            cartData[itemId]-=1;
        }
        await userModel.findByIdAndUpdate
    } catch (error) {
        console.log(error)
        res.json({success:failed,message:error})
        
    }
    
}


export {addToCart,removeFromCart,getUserCart}