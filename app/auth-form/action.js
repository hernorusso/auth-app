"use server";
import { redirect } from "next/navigation";

import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";

const authAction = async (prevState, formData) => {
  let errors = {};
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email.includes("@")) {
    errors.email = "Please use a valid email address";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must have at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    createUser(email, hashedPassword);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email =
        "It seems like an account for the chosen email already exist!";
      return { errors };
    }
    throw error;
  }
  redirect("/training");
};

export { authAction };
