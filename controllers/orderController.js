import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

//Place Order Using Cash On Delivery
const placeOrder = async (req,res)=>{
   try {
    const {userId, items, amount, address} = req.body
    
    const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData: {}})

    res.json({success:true, message:"Order Placed"})
   } catch (error) {
    console.log(error)
    res.json({success:true, message:error.message})
    }
}

//Place order Using Stripe
const placeOrderStripe = async (req,res)=>{

}

//All Orders data for admin pannel
const allOrders = async (req,res)=>{
    
}
//All Orders data for FrontEnd
const userOrders = async (req,res)=>{

}
//All Orders status for admin pannel
const updateStatus = async (req,res)=>{

}

export {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}