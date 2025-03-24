'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Form, Input, Button } from '@heroui/react'
import { toast } from 'react-toastify';

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await signup(undefined, formData);

    if (result.status === 'success') {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "bg-gray-900",
      }); // In order for toast to display on routed page, the page must exist!
      router.push('/dashboard');
    } else {
      toast.error(result.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-1 w-full h-screen">
      <div className="row-span-1 md:col-span-1 flex flex-col justify-center items-center -mt-20">
        <div className="w-full md:hidden">
          <Image
            src='/computer-screens-on-desk-in-empty-data-room-and-co-2025-02-20-07-31-16-utc.jpg'
            alt='design studio'
            layout='cover'
            width={480}
            height={450}
            className='w-full h-auto min-h-[410px] pt-40 md:pt-20'
          />
        </div>
        <div className="hidden md:flex md:flex-col md:justify-center md:items-start w-full h-full">
          <div className="w-full h-full relative flex justify-start">
            <Image
              src='/people-walking-in-office-2024-10-22-04-13-49-utc.jpg'
              alt='people walking in office'
              layout='fill'
              objectFit='cover'
              className='w-full h-full'
            />
          </div>
        </div>
      </div>
      <div className="relative row-span-2 md:row-span-1 min-w-[10px] flex flex-col items-center justify-start md:justify-center bg-white rounded-t-[50px] md:h-full md:my-auto">
        {/* Layer 1 */}
        <div className="absolute -top-6 left-0 right-0 h-full bg-green-300 rounded-t-[50px] md:hidden z-2"></div>
        {/* Layer 2 */}
        <div className="absolute -top-3 left-0 right-0 h-full bg-green-500 rounded-t-[50px] md:hidden z-1"></div>
        <div className="absolute md:relative md:mt-20 flex flex-col w-full h-full items-center md:justify-center bg-white rounded-t-[50px] md:rounded-none z-2">
          <h1 className='text-3xl font-bold text-black-500 py-8'>
            Create your account
          </h1>
          <Form
            className="w-80 flex flex-col gap-4"
            action={handleSubmit}
          >
            <Input
              isRequired
              errorMessage="Please enter your first name"
              name="firstName"
              placeholder="First Name"
              type="text"
              variant="faded"
              classNames={{
                input: [
                  "placeholder:text-gray-700",
                  "text-black-500",
                  "focus:rounded-[13px]",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  //"border-gray-300",
                  "!cursor-text",
                  "rounded-[13px]",
                ],
              }}
            />
            {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
            <Input
              isRequired
              errorMessage="Please enter your last name"
              name="lastName"
              placeholder="Last Name"
              type="text"
              variant="faded"
              classNames={{
                input: [
                  "placeholder:text-gray-700",
                  "text-black-500",
                  "focus:rounded-[13px]",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  //"border-gray-300",
                  "!cursor-text",
                  "rounded-[13px]",
                ],
              }}
            />
            {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
            <Input
              isRequired
              errorMessage="Please enter your email address"
              name="email"
              placeholder="Email"
              type="text"
              variant="faded"
              classNames={{
                input: [
                  "placeholder:text-gray-700",
                  "text-black-500",
                  "focus:rounded-[13px]",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  //"border-gray-300",
                  "!cursor-text",
                  "rounded-[13px]",
                ],
              }}
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <Input
              isRequired
              errorMessage="Please enter your password"
              name="password"
              placeholder="Password"
              type="password"
              variant="faded"
              classNames={{
                input: [
                  "placeholder:text-gray-700",
                  "text-black-500",
                  "focus:rounded-[13px]",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  //"border-gray-300",
                  "!cursor-text",
                  "rounded-[13px]",
                ],
              }}
            />
            {state?.errors?.password && (
              <div>
                <p className='text-red-500 text-left'>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error} className='text-red-500 text-sm font-medium'>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button
              type="submit"
              disabled={pending}
              variant="solid"
              className="w-full mt-4 bg-login-button text-white"
            >
              Sign Up
            </Button>
          </Form>
          <p className="text-gray-500 pt-4">
            or sign up with
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300">
              <Image
                src='/google-logo.svg'
                alt='google'
                width={27}
                height={27}
              />
            </div>
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300">
              <Image
                src='/facebook-logo.svg'
                alt='facebook'
                width={17}
                height={26}
              />
            </div>
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300">
              <Image
                src='/x-logo.svg'
                alt='facebook'
                width={27}
                height={27}
              />
            </div>
          </div>
          <p className="text-gray-500 pt-4">
            Already have an account? <a href="/login" className="text-green-500">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}