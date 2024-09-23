import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://homefer20:uOrzem6oS1hdKyTj@ecommerce.sevle.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
    );
    console.log("Se ha establecido conexión a la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;