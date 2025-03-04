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
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('userId', 'name email'); // Fetch all orders with user details
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//All Orders data for FrontEnd
const userOrders = async (req,res)=>{
  try {
    const {userId} = req.body

    const orders = await orderModel.find({userId})
    res.json({success:true, orders})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}
//All Orders status for admin pannel
const updateStatus = async (req,res)=>{
 try {
  const {orderId, status} = req.body
  await orderModel.findByIdAndUpdate(orderId, {status})
  res.json({success:true, message: 'Status Updated'})
 } catch (error) {
  console.log(error)
    res.json({success:false, message:error.message})
 }
}

export {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}