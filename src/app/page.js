
import { redirect } from "next/navigation";
import { Hero } from "../components/Hero";
import { cookies } from "next/headers";
// import { useAuth } from "../providers/AuthProvider";

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}
export default function Home() {
  const token = getToken();
  console.log(token);
  return (
    <>
      <h1>Home Page</h1>
      <Hero />
    </>
  );
}
