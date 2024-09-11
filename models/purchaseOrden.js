import mongoose from "mongoose";

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
  },
  {
    timestamps: true, // createAt, updatedAt
  }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;