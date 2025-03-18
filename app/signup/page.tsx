import { Footer } from '@/components/layout/footer';
import { SignUp as SignUpComponent } from '@/components/signup/signup';

export default function Login() {
  return (
    <div className='flex flex-col overflow-x-hidden services'>
      <SignUpComponent />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}