import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectDB.js"
import userRoute from "./routes/user.route.js"

const app = express()
dotenv.config()
const PORT = process.env.PORT
connectDB()

app.use(express.json())

app.use('/user', userRoute)



app.listen(PORT, () => {
    console.log('server start on', PORT);
})

