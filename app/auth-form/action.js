"use server";
import { redirect } from "next/navigation";

import { createUser, getUserByEmail } from "@/lib/user";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createAuthSession } from "@/lib/auth";

const signUp = async (prevState, formData) => {
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
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email =
        "It seems like an account for the chosen email already exist!";
      return { errors };
    }
    throw error;
  }
};

const login = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = getUserByEmail(email);

  if (!user) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials",
      },
    };
  }

  const isValidPassword = verifyPassword(user.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials",
      },
    };
  }

  await createAuthSession(user.id);
  redirect("/training");
};

const auth = async (mode, prevState, formData) => {
  if (mode === "login") {
    return login(prevState, formData);
  }

  return signUp(prevState, formData);
};

export { auth };
