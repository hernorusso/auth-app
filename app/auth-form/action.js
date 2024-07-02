"use server";

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
  } else {
    return {};
  }
};

export { authAction };
