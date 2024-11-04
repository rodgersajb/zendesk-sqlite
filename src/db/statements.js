import Database from "better-sqlite3";
const db = new Database("database.db");
db.pragma("journal_mode = WAL");
const createTable = () => {
  const sql = `
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT
            age INTEGER
        )
            `;
  db.prepare(sql).run();
};

const getUsers = () => {
  const sql = `
        SELECT * FROM users
    `;
  const rows = db.prepare(sql).all();
  console.log(rows)
}

const insertTable = (name, email) => {
  const sql = `
        INSERT INTO users (name, email) 
        VALUES (?, ?)
  `
  db.prepare(sql).run(name, email);
}

getUsers()