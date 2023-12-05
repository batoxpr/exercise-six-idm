import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser({ createUser, isLoggedIn }) {
    const router = useRouter ();
    useEffect(() => {
      // If user is logged in forward them to the profile page
      if (isLoggedIn) router.push("/"); // router push takes to whatever page after /
    }, [isLoggedIn]);

    return (
          <main>
            <h1>Create User</h1>
            <CreateUserForm createUser={createUser}/>
          </main>
    );
}