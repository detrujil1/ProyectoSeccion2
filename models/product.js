import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        size: { type: String, required: true },
        stock: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        sku: { type: String, required: true },
        description: { type: String },  // Campo de descripción opcional
        images: [{ type: String }],  // Campo para imágenes como un array opcional
        deletedAt: { type: Date, default: null }
    },
    {
      timestamps: true  // Para tener createdAt y updatedAt automáticamente
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
