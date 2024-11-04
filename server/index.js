// server/index.js
const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route to test the server
app.get("/api", (req, res) => {
  res.send("API is working!"); // Or return any data you want
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
