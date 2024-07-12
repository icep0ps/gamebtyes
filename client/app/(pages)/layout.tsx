import Breadcrumb from '@/components/ui/breadcrumb';
import Navigation from '@/components/ui/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb />
      <div className="flex-grow-1 overflow-y-scroll flex flex-col gap-5 relative px-3">
        {children}
      </div>
      <Navigation />
    </>
  );
}
