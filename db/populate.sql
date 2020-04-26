-- INSERT Users
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  usermail VARCHAR(30),
  password VARCHAR(20),
  created_at timestamp default current_timestamp
);

INSERT INTO users (usermail, password) VALUES ('youmna@gmail.com', '123456');
INSERT INTO users (usermail, password) VALUES ('carole@gmail.com', '123456');
INSERT INTO users (usermail, password) VALUES ('aissatou@gmail.com', '123456');
INSERT INTO users (usermail, password) VALUES ('puvy@gmail.com', '123456');