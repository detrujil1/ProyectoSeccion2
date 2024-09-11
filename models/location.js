import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        id:String,
        city:String,
        zipCode:String,
        address:String,
    }
)
const location = mongoose.model("location", locationSchema);
export default location;