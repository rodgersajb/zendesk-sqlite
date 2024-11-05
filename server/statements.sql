CREATE TABLE sql_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_name TEXT NOT NULL,
    given_name TEXT NOT NULL,
    email TEXT NOT NULL
);

INSERT INTO zendesk_users (family_name, given_name, email)
VALUES
('Shimt', 'Shompster', 'shimpt@shampt.com')