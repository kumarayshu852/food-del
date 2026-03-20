import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const foodRouter = express.Router();

// cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
   params: async (req, file) => ({
    folder: "food-items",
    format: "png", // optional
    public_id: Date.now() + "-" + file.originalname
})
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;