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
      <Toaster />
      <div className="overflow-y-hidden flex flex-col  gap-4 relative p-3 w-1/2 mx-auto my-0">
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </div>
    </>
  );
}
