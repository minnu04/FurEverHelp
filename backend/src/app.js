import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import donationRoutes from "./routes/donationRoutes.js";
import dashboardRoutes from './routes/dashboardRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import razorpayWebhook from "./webhooks/razorpayWebhook.js"
import errorMiddleware from './middlewares/errorMiddleware.js';
import { apiLimiter, authLimiter } from './middlewares/reteLimiter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', profileRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/uploads', uploadRoutes);
app.post(
    '/api/webhooks/razorpay', 
    express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }),
    razorpayWebhook
);

app.get('/', (req, res) => {
    res.send(' 🐾 FurEverHelp API is running');
});

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route working' });
});

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use(errorMiddleware);

export default app;