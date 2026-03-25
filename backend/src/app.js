import { MONGO_URI } from './config/index.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import express from 'express';
import mongoose from 'mongoose';
import notFoundHandler from './middlewares/not-found.middleware.js';
import notificationRoutes from './routes/notification.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', apiLimiter, taskRoutes);
app.use('/notifications', apiLimiter, notificationRoutes);
app.get('/', (req, res) => res.send('API Running'));
app.use(notFoundHandler);
app.use(errorHandler);

export default app;