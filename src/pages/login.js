import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/app/components/LoginForm";

export default function Login({isLoggedIn, loginUser}) {
  const router = useRouter();
  useEffect(() => {
    // to do: if user is logged in forward them to the profile page
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

    return (
          <main>
            <h1>Login</h1>
            <LoginForm loginUser={loginUser}/>
          </main>
    );
}