// server/index.js
const express = require("express");
const app = express();
const PORT = 5000;

// Import the zendeskClient
const zendeskClient = require("./zendeskClient");

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route to test the server
app.get("/api", (req, res) => {
  res.send("API is working!"); // Or return any data you want
});

// Import the zendeskClient
app.get("/api/users", async (req, res) => {
  try {
    const response = await zendeskClient.get("/users.json");
    console.log(response.data, 'USERS');
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
