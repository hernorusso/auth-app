import db from "./db";

const createUser = (email, password) => {
  const userId = db
    .prepare("INSERT INTO users (email, password) VALUES (?,?)")
    .run(email, password);
  return userId;
};

export { createUser };
