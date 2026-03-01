const express = require("express");
require("dotenv").config();
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes.js");
const connectDB=require("./config/db.js")




const app = express();
connectDB()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database


// Routes
app.use("/api", todoRouter);

// Start server
const PORT =process.env.PORT 
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
