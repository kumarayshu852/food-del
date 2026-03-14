import mongoose  from "mongoose";

const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    studentId:{type:String,required:true,unique:true,uppercase:true,match:[/^[A-Z]{3}[0-9]{7}$/, "Invalid Student ID"]},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})

const userModel =mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;