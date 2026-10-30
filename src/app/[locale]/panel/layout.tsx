import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import AuthGuard from "@/guards/authgaurd"

export const instant = false


export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <AuthGuard type="auth">
        <Header />
        <div className="flex">
          <SideBar />
          <main>
            {children}
          </main>
        </div>
      </AuthGuard>
    </section>
  );
}