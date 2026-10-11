// Entry point — sets up Express, connects to MongoDB, starts the server
require("dotenv").config(); // loads variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests ONLY from our React frontend (Vite runs on port 5173)
app.use(cors({ origin: "http://localhost:5173" }));

// Parse JSON request bodies
app.use(express.json());

// All task routes live under /api/tasks
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });