// app/(site)/login/page.tsx

import Footer from '@/ui/layout/footer';
import { Login as LoginComponent } from '@/ui/login/login';

export default function Login() {
  return (
    <div className='flex flex-col overflow-x-hidden services'>
      <LoginComponent />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}