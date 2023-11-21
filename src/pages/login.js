import Header from "@/app/components/Header";
import LoginForm from "@/app/components/LoginForm";

export default function Login() {
    return (
        <>
          <Header />
          <main>
            <h1>Login</h1>
            <LoginForm/>
          </main>
        </>
    );
}