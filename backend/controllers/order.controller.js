import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import userModel from '../models/user.model.js'
import Stripe from "stripe"
import Razorpay from 'razorpay'
import crypto from 'crypto'

const stripe=new Stripe(process.env.STRIPE_SERCRET_KEY)


// PLACING the order
// const placeOrder=async(req,res)=>{
//     const frontend_url=`http://localhost:5173`
    
//     try {
//         const newOrder=new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address,
//         })

//         await newOrder.save()
//         await userModel.findByIdAndUpdate(req.body.userId,{cart:{}})


//         // Line items
//         const line_items=req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quanitiy
//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })
        
//         // creating session
//         const session=await stripe.checkout.sessions.create({
//             line_item:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`
//         })


//         res.json({success:true,session_url:session.url})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"ERROR"})
//     }
// }

// const verifyOrder=async(req,res)=>{
//     const {orderId,success}=req.body;
//     try {
//         if(success=="true"){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true,message:"Paid"})
//         }else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Not Paid"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
        
//     }

// }

// RAZOR PAY

const placeOrder=async(req,res)=>{
    try {
        // new instance of Razorpay 
        const razorpay=new Razorpay({
            key_id:process.env.RPAY_KEY_ID,
            key_secret:process.env.RPAY_SECRET
        })
        const options=req.body;
        const order=await razorpay.orders.create(options)

        if(!order){
            return res.status(500).send("No Order")
        }
        res.json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const sendOrder=async(req,res)=>{
    try {
        const { userId, items, amount, address, status, payment } = req.body;

        // Create a new order instance
        const newOrder = new Order({
            userId,
            items,
            amount,
            address,
            status: status || "Food Processing", // Use default if not provided
            payment: payment || false
        });
        const savedOrder = await newOrder.save();
    } catch (error) {
        
    }
}

//api to validate order
const verifyOrder=async(req,res)=>{
    // Destructureing is based on names of the object not the order of them
    console.log("VEryfinug",)
    try{
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body 
        const sha=crypto.createHmac("sha256",process.env.RPAY_SECRET)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest=sha.digest("hex")
        if(digest!==razorpay_signature){
            return res.status(400).json({msg:"Transaction is not legit !"})
        }
        
        console.log("VEryfinug 2",)
        res.json({msg:"success",orderId:razorpay_order_id,paymentId:razorpay_payment_id})
    }catch{
        res.json({msg:"Failed",orderId:razorpay_order_id,paymentId:razorpay_payment_id})
    }
}


// RAZORPAY END
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

export {placeOrder,verifyOrder,userOrders,listOrder,updateStatus,sendOrder}