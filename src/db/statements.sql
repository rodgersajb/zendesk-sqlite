CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
family_name TEXT NOT NULL,
given_name TEXT NOT NULL,
email TEXT NOT NULL
)

INSERT INTO users (name, email, age) 
VALUES 
    ('Alice', 'tremendous.lemur.wckz@flashpost.net', 25),
    ('Bob', 'rwz0s@livinitlarge.net', 30),
    ('Charlie', 'colohek646@operades.com', 35)

DROP TABLE users