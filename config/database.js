import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUri = process.env.DB_URI;


async function connectDB() {
  try {
    const connection = await mongoose.connect(
      mongoUri



    );
    console.log("Se ha establecido conexión a la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;