import { useEffect } from "react";
import { useRouter } from "next/router";
import UserProfileCard from "@/app/components/UserProfileCard";

export default function UserProfile({isLoggedIn, userInformation}) {
  const router = useRouter();

  useEffect(() => { 
   // if user is not logged in, send them to login page
  if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn]);

  return (
        <main>
          <h1>User Profile</h1>
          <UserProfileCard user={userInformation}/>
        </main>
  );
}