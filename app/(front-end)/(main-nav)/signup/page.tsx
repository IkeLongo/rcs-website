// app/(site)/signup/page.tsx

import Footer from '@/app/components/layouts/footer/footer';
import { SignUp as SignUpComponent } from '@/app/components/layouts/signup/signup';

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