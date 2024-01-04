import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import logger, { morganMiddleware } from './config/logger.js';

dotenv.config();
const app = express();

// Middleware Configuration

// Enable CORS with specific origin (Your Angular app's URL)
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Built-in body parsing middleware (replaces bodyParser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan middleware for logging HTTP requests
app.use(morganMiddleware);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error('Database connection error:', err));

// API Routes
app.use('/api', routes);

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
