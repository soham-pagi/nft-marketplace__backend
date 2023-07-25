const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specified HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specified headers
  })
);


// Routes
app.use("/api/users", userRoutes);

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  })
})
