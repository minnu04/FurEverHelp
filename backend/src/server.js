import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.port || 2204;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
