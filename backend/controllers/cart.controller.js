import cartModel from "../models/cart.model.js"
import userModel from "../models/user.model.js"


//fetch userCart data
const getUserCart=async(req,res)=>{

}

// add items to cart
const addToCart=async(req,res)=>{

    res.json({success:true,message:"Item added to cart"})
}


// remove items from cart
const removeFromCart=async(req,res)=>{
    
}


export {addToCart,removeFromCart,getUserCart}