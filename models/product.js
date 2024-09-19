import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        
        name:String,
        size:String,
        stock:String,
        price:Number,
        category:String,
        brand:String,
        sku:String,
        deletedAt:{
            type:Date,
            default:null
          }
    }
)
const Product = mongoose.model("Product", productSchema);
export default Product;