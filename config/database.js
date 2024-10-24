import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/baseDeDatosDePrueba"
    );
    console.log("Se ha establecido conexión a la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;