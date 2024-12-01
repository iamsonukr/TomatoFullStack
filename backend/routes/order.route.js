import { listOrder, placeOrder, userOrders, verifyOrder,updateStatus,sendOrder } from "../controllers/order.controller.js";
import express, { Router } from "express";
import authMiddleware from '../middleware/auth.middleware.js'

const orderRouter=express.Router() 
orderRouter.get("/list",listOrder)
orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",authMiddleware,verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.post("/status",updateStatus)
orderRouter.post("/sendorder",sendOrder)


export default orderRouter

