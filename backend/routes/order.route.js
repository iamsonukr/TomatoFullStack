import { listOrder, placeOrder, userOrders, verifyOrder,updateStatus } from "../controllers/order.controller.js";
import express, { Router } from "express";
import authMiddleware from '../middleware/auth.middleware.js'

const orderRouter=express.Router() 
orderRouter.get("/list",listOrder)
orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.post("/status",updateStatus)


export default orderRouter

