import LoginPage from "@/components/loginpage"
import AuthGuard from "@/guards/authgaurd";


export default function Home() {
  return (
    <AuthGuard type="guest">
      <LoginPage />
    </AuthGuard>
  );
}
