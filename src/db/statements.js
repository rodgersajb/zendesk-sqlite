import Database from "better-sqlite3";
import { error } from "console";
const db = new Database("database.db");
db.pragma("journal_mode = WAL");
const createTable = () => {
  const sql = `
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
          family_name TEXT NOT NULL,
          given_name TEXT NOT NULL,
          email TEXT NOT NULL
        )
            `;
  db.prepare(sql).run();
};

export const getUserByEmail = (email) => {
  const sql = `
    SELECT * FROM users WHERE email = ?;
    
  
  `;
  return db.prepare(sql).get(email);
};

export const addUserToDatabase = (id, family_name, given_name, email) => {
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    console.log("user already exists");
    return;
  }
  const sql = `
    INSERT INTO users (
        id,
        family_name,
        given_name,
        email
    )
    VALUES (?, ?, ?, ?)
    `;
  if (error) {
    console.log("error adding user", error);
  } else {
    db.prepare(sql).run(id, family_name, given_name, email);
    console.log("user added");
  }
};
const getUsers = () => {
  const sql = `
        SELECT * FROM users
    `;
  const rows = db.prepare(sql).all();
  console.log(rows);
};

const insertTable = (name, email) => {
  const sql = `
        INSERT INTO users (name, email) 
        VALUES (?, ?)
  `;
  db.prepare(sql).run(name, email);
};

createTable();
