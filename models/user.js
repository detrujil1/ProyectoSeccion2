import mongoose from "mongoose";
import encryptPassword from "../middleware/ecrypt.js";

const userSchema = new mongoose.Schema(
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

userSchema.pre("save", encryptPassword);

const User = mongoose.model("User", userSchema);
export default User;