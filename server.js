const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const employeeRoutes = require("./routes/employees");
const db = require("./db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/employees", employeeRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    const connection = await db.getConnection();
    console.log(`✅ Server running on port ${PORT}`);
    console.log("✅ MySQL Database Connected!");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
});
