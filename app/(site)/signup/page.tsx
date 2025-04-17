import { Footer } from '@/app/ui/layout/footer';
import { SignUp as SignUpComponent } from '@/app/ui/signup/signup';

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