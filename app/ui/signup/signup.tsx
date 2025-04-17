
//import { signup } from '@/app/actions/auth';
import { SignupForm } from '@/app/ui/signup/signup-form';

export async function SignUp() {
  return (
    <div className='relative flex flex-col items-center overflow-x-hidden min-h-screen bg-login-mobile-bg md:bg-white z-10'>
      <SignupForm />
    </div>
  );
}