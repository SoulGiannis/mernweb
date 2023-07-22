import express from 'express';
import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import UserController from './controllers/usercontrollers.js';
dotenv.config();

const app = express();
app.use(cors());

const port = process.env.port || 8000;
const DATABASE_URL = process.env.url;

connectDB(DATABASE_URL);

app.use(express.json());

import authMiddleware from './middlewares/authMiddleware.js';

// app.get('/', authMiddleware, UserController.aarogramSecureHome);

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Connected Successfully... ${port}`);
});
