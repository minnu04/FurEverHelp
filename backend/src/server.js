import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB  from './config/db';

const PORT = process.env.PORT || 2204;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});