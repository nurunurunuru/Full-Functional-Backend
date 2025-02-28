import express from "express";
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//For Admin
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//For Payment
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

//For User
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter