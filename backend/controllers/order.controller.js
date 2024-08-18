import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import userModel from '../models/user.model.js'
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SERCRET_KEY)


// PLACING the order
const placeOrder=async(req,res)=>{
    const frontend_url=`http://localhost:5173`
    
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cart:{}})


        // Line items
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quanitiy
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        
        // creating session
        const session=await stripe.checkout.sessions.create({
            line_item:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`
        })


        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"ERROR"})
    }
}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const listOrder=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
        
    }
}

const updateStatus=async(req,res)=>{
    const {userId,status}=req.body
    try {
        const response=await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Updating failed"})
        
    }
     
}

export {placeOrder,verifyOrder,userOrders,listOrder,updateStatus}