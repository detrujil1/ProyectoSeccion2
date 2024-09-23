import mongoose from "mongoose";
import encryptPassword from "../middleware/ecrypt.js";

const adminSchema = new mongoose.Schema(
    {
        document:String,
        name:String,
        lastName:String,
        email:String,
        password:String,
        deletedAt:{
            type:Date,
            default:null
          }

    }
)

adminSchema.pre("save", encryptPassword);

const admin = mongoose.model("Admin", adminSchema);
export default admin;
