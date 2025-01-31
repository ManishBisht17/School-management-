import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import teacherRoutes from './routes/teacher.js'

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const PORT =3000;
const MONGO_URI = process.env.MONGO_URI;


//Routes handling
app.use('/teacher',teacherRoutes)


// Database connection
const db=mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });





// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;