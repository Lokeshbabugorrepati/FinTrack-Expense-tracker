import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { logger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Logger middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FinTrack API is running",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Error handler (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log("═══════════════════════════════════════════════".cyan);
    console.log(`  🚀 FinTrack Server Running `.green.bold);
    console.log(`  📍 Port: ${PORT}`.yellow);
    console.log(
      `  🌍 Environment: ${process.env.NODE_ENV || "development"}`.yellow,
    );
    console.log("═══════════════════════════════════════════════".cyan);
  });
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`✗ Unhandled Rejection: ${err.message}`.red.bold);
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// Export for Vercel
export default app;
