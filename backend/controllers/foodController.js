import foodModel from "../models/foodModel.js";
import fs from 'fs';
import cloudinary from "../config/cloudinary.js";

// add food item

const addFood =async (req, res)=>{
    let image_filename = req.file.path;


    const food =new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        public_id: req.file.filename
    })
    try{
        await food.save();
        res.json({success:true, message:"Food Added"})
    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list 
const listFood =async(req,res)=>{
    try{
        const foods =await foodModel.find({});
        res.json({success:true,data:foods})
    }catch{
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    const parts = food.image.split("/");
    const fileName = parts[parts.length - 1];
    const public_id = "food-items/" + fileName.split(".")[0];

    await cloudinary.uploader.destroy(public_id);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {addFood, listFood, removeFood}