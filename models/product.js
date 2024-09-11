import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        id:String,
        name:String,
        size:String,
        stock:String,
        price:Number,
        category:String,
        brand:String,
    }
)
const Product = mongoose.model("Product", productSchema);
export default Product;