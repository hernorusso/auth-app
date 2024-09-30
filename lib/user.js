import db from "./db";

const createUser = (email, password) => {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?,?)")
    .run(email, password);

  return result.lastInsertRowid;
};

const getUserByEmail = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};

export { createUser, getUserByEmail };
