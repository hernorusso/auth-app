import { AuthForm } from "./auth-form";

export default async function Home({ searchParams }) {
  const { mode = "login" } = searchParams;

  return <AuthForm mode={mode} />;
}
