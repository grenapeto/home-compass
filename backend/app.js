import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import logger, { morganMiddleware } from './config/logger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger.js'; // Adjust the path as necessary


// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const allowedOrigins = ['http://localhost:4200', 'http://aragorn:9877'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morganMiddleware); // Logging middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  logger.info(`Open the API documentation on http://localhost:3000/api-docs.`)
});
