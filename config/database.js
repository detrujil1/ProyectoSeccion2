import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/Baseproyecto"
    );
    console.log("Se ha establecido conexión a la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;