import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes.js';
import logger from './config/logger.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200' // Your Angular app's URL
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error(err));

// Routes
app.use('/api', routes); // Line 22

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
