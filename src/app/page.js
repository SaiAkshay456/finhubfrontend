
// import { redirect } from "next/navigation";
// import { Hero } from "../components/Hero";
import { cookies } from "next/headers";
// import { useAuth } from "../providers/AuthProvider";


export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
