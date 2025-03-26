import Navbar from '@/app/ui/layout/navbar/navbar';
import CookieBanner from '@/app/ui/cookie-prefs/cookie-banner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookieBanner />
      <main className="fixed top-0 z-50 w-full">
        <Navbar />
        <ToastContainer limit={1} theme="dark" />
      </main>
      <div>{children}</div> {/* offset for navbar */}
    </>
  );
}
