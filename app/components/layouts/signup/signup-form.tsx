'use client'

import { signUp } from '@/lib/security/auth'
import { signIn } from "next-auth/react";
import React, { useActionState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Form, Input, Button } from '@heroui/react'

async function getToast() {
  const mod = await import("react-toastify");
  return mod.toast;
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [formError, setFormError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await signUp(undefined, formData);

    if (result.status === 'success') {
      setFormError(null);
      const toast = await getToast();
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "bg-gray-900",
      });
      router.push('/dashboard');
    } else {
      setFormError(result.message || 'An error occurred during signup.');
      const toast = await getToast();
      toast.error(result.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-1 w-full h-screen">
      <div className="row-span-1 md:col-span-1 flex flex-col justify-center items-center -mt-20">
        <div className="relative w-full md:hidden overflow-hidden min-h-[410px]">
          <Image
            src="/computer-screens-on-desk-in-empty-data-room.webp"
            alt="design studio"
            fill
            priority
            className="object-cover object-left pt-40 md:pt-20 -pr-20"
          />
        </div>
        <div className="hidden md:flex md:flex-col md:justify-center md:items-start w-full h-full">
          <div className="w-full h-full relative flex justify-start">
            <Image
              src='/people-walking-in-office.webp'
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
                  "!focus:outline-none",
                  "!focus-visible:outline-none",
                  "!focus-visible:ring-0",
                  "!outline-none",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  "!cursor-text",
                  "rounded-[13px]",
                  "focus:ring-2",
                  "focus:ring-blue-500",
                  "border-2",
                  "border-gray-300",
                  "!focus:border-blue-500",
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
                  "!focus:outline-none",
                  "!focus-visible:outline-none",
                  "!focus-visible:ring-0",
                  "!outline-none",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  "!cursor-text",
                  "rounded-[13px]",
                  "focus:ring-2",
                  "focus:ring-blue-500",
                  "border-2",
                  "border-gray-300",
                  "!focus:border-blue-500",
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
                  "!focus:outline-none",
                  "!focus-visible:outline-none",
                  "!focus-visible:ring-0",
                  "!outline-none",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  "!cursor-text",
                  "rounded-[13px]",
                  "focus:ring-2",
                  "focus:ring-blue-500",
                  "border-2",
                  "border-gray-300",
                  "!focus:border-blue-500",
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
                  "!focus:outline-none",
                  "!focus-visible:outline-none",
                  "!focus-visible:ring-0",
                  "!outline-none",
                ],
                innerWrapper: [
                  "bg-white",
                  "rounded-[13px]",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-white",
                  "!cursor-text",
                  "rounded-[13px]",
                  "focus:ring-2",
                  "focus:ring-blue-500",
                  "border-2",
                  "border-gray-300",
                  "!focus:border-blue-500",
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
              className="w-full mt-4 bg-blue-500 text-white rounded-[13px] hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Sign Up
            </Button>
            {formError && (
              <div className="mt-4 text-red-600 text-center font-semibold">
                {formError}
              </div>
            )}
          </Form>
          <p className="text-gray-500 pt-4">
            or sign up with
          </p>
          <div className="flex gap-4 pt-4">
            {/* Google Sign-In Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300"
            >
              <Image
                src='/google-logo.svg'
                alt='google'
                width={27}
                height={27}
              />
            </button>
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
              className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300"
            >
              <Image
                src='/facebook-logo.svg'
                alt='facebook'
                width={17}
                height={26}
              />
            </button>
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center border border-gray-300">
              <Image
                src='/logo-apple.svg'
                alt='apple'
                width={25}
                height={30}
              />
            </div>
          </div>
          <p className="text-gray-500 pt-4">
            Already have an account? <a href="/login" className="text-green-500 underline font-bold">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}