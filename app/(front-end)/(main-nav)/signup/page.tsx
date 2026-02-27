// app/(site)/signup/page.tsx

import Footer from '@/ui/layout/footer';
import { SignUp as SignUpComponent } from '@/ui/signup/signup';

export default function SignUp() {
  return (
    <div className='flex flex-col overflow-x-hidden services'>
      <SignUpComponent />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}