import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import logger, { morganMiddleware } from './config/logger.js';

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Middleware Configuration
app.use(cors({ origin: 'http://localhost:4200' })); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morganMiddleware); // Logging middleware

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    logger.info('Database connected');
  } catch (err) {
    logger.error('Database connection error:', err);
  }
};

connectToDatabase();

// API Routes
app.use('/api', routes);

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
