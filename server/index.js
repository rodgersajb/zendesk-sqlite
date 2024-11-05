import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import bodyParser from "body-parser";
import { addUserToDatabase, getUserByEmail } from "./db.js";
import { createZendeskUser } from "./zendesk.js";
import zendeskClient from "./zendeskClient.js";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

app.use(bodyParser.json());
const PORT = 5000;

// Sample route to test the server
app.get("/api", (req, res) => {
  res.send("API is working!"); // Or return whatever we want
});

app.post("/api/registerUser", async (req, res) => {
  const { id, family_name, given_name, email } = req.body;
  try {
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      console.log("user already exists");
      return res.status(400).send("User already exists");
    }
    console.dir(req.body, "REGISTER USER");

    // Add user to the database
    await addUserToDatabase(id, family_name, given_name, email);

    // Create user in Zendesk
    await createZendeskUser(id, email, given_name, family_name);

    res.status(201).json({ message: "User created" });
    
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).send("Error creating user");
  }
});

// // Import the zendeskClient
app.get("/api/users", async (req, res) => {
  try {
    const response = await zendeskClient.get("/users.json");

    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
