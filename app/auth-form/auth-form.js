"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { authAction } from "./action";

const AuthForm = () => {
  const [state, formAction] = useFormState(authAction, {});

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        <button type="submit">Create Account</button>
      </p>
      {state.errors &&
        Object.keys(state.errors).map((error) => (
          <li key={error} id="form-errors">
            {state.errors[error]}
          </li>
        ))}
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
};

export { AuthForm };
