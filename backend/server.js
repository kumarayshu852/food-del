import 'dotenv/config.js'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"

import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config 
const app= express()
const port= 4000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req, res)=>{
    res.send("API Working")
})
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
//mongodb+srv://food-del:2233445566778899@cluster0.1nndrga.mongodb.net/?appName=Cluster0

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})