import express from "express"
import { userLogin, userRegister } from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.get('/userCheck', (req, res) => {
    res.send("hello world")
})


userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);


export default userRoute