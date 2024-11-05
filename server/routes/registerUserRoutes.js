import express from "express";
import { addUserToDatabase, getUserByEmail } from "../db.js";
import { createZendeskUser } from "../zendesk.js";

const router = express.Router();

router.post("/registerUser", async (req, res) => {
  const { family_name, given_name, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email); // Implement this function
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in the database
    const userId = await addUserToDatabase(
      null,
      family_name,
      given_name,
      email
    );

    // Create a Zendesk user (using userId or external ID as needed)
    await createZendeskUser(userId, email, given_name, family_name);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
