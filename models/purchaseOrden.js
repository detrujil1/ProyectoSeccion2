import mongoose from "mongoose";
import user from "./user.js";
const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    deletedAt:{
      type:Date,
      default:null
    }
  },
  {
    timestamps: true, // createAt, updatedAt
  }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;

user
products:quantity: Number