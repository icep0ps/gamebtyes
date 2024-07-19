import Breadcrumb from "@/components/ui/breadcrumb";
import Navigation from "@/components/ui/navigation";
import AuthProvider from "../hooks/auth";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      <Toaster />
      <div className="flex-grow-1 overflow-y-hidden flex flex-col gap-5 relative px-3">
        <AuthProvider>{children}</AuthProvider>
      </div>
      <Navigation />
    </>
  );
}
