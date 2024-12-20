import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.DB_URI;

async function databaseConnection() {
    try {
        if (!mongoUri) {
            throw new Error('No DB_URI defined in environment variables');
        }
        await mongoose.connect(mongoUri); // Sin opciones adicionales
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
}

export default databaseConnection;
