import Database from "better-sqlite3";
const db = new Database("database.db");
db.pragma("journal_mode = WAL");

import { createZendeskUser } from "./zendesk.js";

export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const user = await db.prepare(sql).get(email);
  return user;
};

export const addUserToDatabase = async ( family_name, given_name, email) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    console.log("user already exists");
    return;
  }
  const sql = `
    INSERT INTO users (
        
        family_name,
        given_name,
        email
    )
    VALUES (?, ?, ?)
    `;
  try {
    db.prepare(sql).run( family_name, given_name, email);
    console.log("user added to SQLite database");
    await createZendeskUser( email, given_name, family_name);
  } catch (error) {
    console.log("error adding user", error);
  }
};
