import { getOrder,placeOrder, userOrders, verifyOrder } from "../controllers/order.controller.js";
import express, { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRouter=express.Router() 


orderRouter.post("/get",authMiddleware,getOrder)

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,verifyOrder,userOrders)




export default orderRouter

