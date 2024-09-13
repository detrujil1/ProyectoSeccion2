import mongoose from "mongoose";

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
const User = mongoose.model("User", userSchema);
export default User;