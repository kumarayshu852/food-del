import mongoose from "mongoose";

 export const connectDB =async() =>{
    await mongoose.connect("mongodb+srv://food-del:2233445566778899@cluster0.1nndrga.mongodb.net/foo-del").then(()=>console.log("DB connected"));
}
