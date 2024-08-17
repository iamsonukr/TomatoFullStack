import { response } from "express"
import cartModel from "../models/cart.model.js"
import userModel from "../models/user.model.js"


//fetch userCart data

// function will convert the token given in header into userId
const getUserCart=async(req,res)=>{
    try{
        const user=req.body.userId
        let userData=await userModel.findById(user)
        let cartItems=userData.cart
        res.json({hero:user,success:true,data:cartItems})
    }catch(error){
        console.log(error)
        res.json({success:false,data:error})
    }

}

// add items to cart
const addToCart=async(req,res)=>{
    try {

        //each user has a cart associated with it ..... Fetching the exact user through id 
        // 1> Fetching user
        let userData=await userModel.findOne({_id:req.body.userId})

        // 2> selecting user cart( object )
        let cartData= userData.cart;

        // 3> checkcing unique ID of the food item to be added
        let itemId=req.body.itemId
    
        //  4> Checking if the cart already has that itemID as key . If not add one else increase 1
        if(!cartData[itemId])
        {
            cartData[itemId]=1
            console.log(cartData[itemId])
        }
        else{
            cartData[itemId]+=1;
            console.log(cartData[itemId])
        }

        // 5> updating the userID in database
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
        // user model to find and update the data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    } catch (error) {
        console.log(error)
        res.json({success:failed, message:error})
    }
}

export {addToCart,removeFromCart,getUserCart}