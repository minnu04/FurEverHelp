import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/campaigns', campaignRoutes);

app.get('/', (req, res) => {
    res.send(' 🐾 FurEverHelp API is running');
});

export default app;