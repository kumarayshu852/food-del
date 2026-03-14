import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// login user
const loginUser = async (req,res)=>{
    const {studentId,password} =req.body;
    try{
        const user =await userModel.findOne({studentId});
        if (!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token =createToken(user._id);
        res.json({success:true,token})

    }catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res)=>{
    const {name, studentId, password} = req.body;

    try{

        const formattedId = studentId.toUpperCase();

        // checking if user already exists
        const exists = await userModel.findOne({ studentId: formattedId });

        if (exists){
            return res.json({success:false,message:"User already exists"})
        }

        // regex validation
        if (!/^[A-Z]{3}[0-9]{7}$/.test(formattedId)){
            return res.json({success:false,message:"Please enter a valid studentId"})
        }

        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            studentId: formattedId,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true,token});

    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}