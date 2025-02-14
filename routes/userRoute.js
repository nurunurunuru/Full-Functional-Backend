import express from "express"

import { loginUser, registerUser, adminLogin } from "../controllers/userControlles.js"

const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin-login', adminLogin)

export default userRouter;