import Header from "@/app/components/Header";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser() {
    return (
        <>
          <Header />
          <main>
            <h1>Create User</h1>
            <CreateUserForm/>
          </main>
        </>
    );
}