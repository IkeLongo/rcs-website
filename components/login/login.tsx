import Image from 'next/image';
import { Form, Button } from "@heroui/react";
import {Input} from "@heroui/input";

export async function Login() {
  return (
    <div className='flex flex-col items-center overflow-x-hidden min-h-screen bg-login-mobile-bg'>
      <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-1 w-full max-w-[1040px] h-screen">
        <div className="row-span-1 md:col-span-1 flex flex-col justify-center items-center -mt-20">
          <Image
            src='/river-rat-head-logo.svg'
            alt='logo'
            width={42}
            height={45}
            className='pt-40 md:pt-20'
          />
          <div className="hidden md:flex md:flex-col md:justify-center md:items-start gap-4 pt-6 w-80">
            <div className="flex items-start gap-2">
              <Image
                src='/Gears.svg'
                alt='login'
                width={24}
                height={24}
              />
              <div>
                <p className='text-gray-800 font-bold text-left'>
                  Adaptable performance
                </p>
                <p className='text-gray-500 text-left'>
                  Our websites are fast, scalable, and designed to adapt seamlessly to your growing needs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src='/Hammer.svg'
                alt='login'
                width={24}
                height={24}
              />
              <div>
                <p className='text-gray-800 font-bold text-left'>
                  Built to last
                </p>
                <p className='text-gray-500 text-left'>
                  We build secure, high-quality websites with clean code that ensures long-term stability.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src='/Like.svg'
                alt='login'
                width={24}
                height={24}
              />
              <div>
                <p className='text-gray-800 font-bold text-left'>
                  Great user experience
                </p>
                <p className='text-gray-500 text-left'>
                  Every website we create is intuitive, visually engaging, and optimized for seamless user interaction.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src='/Wand.svg'
                alt='login'
                width={24}
                height={24}
              />
              <div>
                <p className='text-gray-800 font-bold text-left'>
                  Innovative functionality
                </p>
                <p className='text-gray-500 text-left'>
                  We develop custom features and smart automation to make your website a powerful business tool.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-2 flex flex-col items-center justify-start md:justify-center md:bg-white md:rounded-lg md:shadow-lg md:w-96 md:p-8 md:my-auto lg:ml-20">
          <h1 className='text-3xl font-bold text-black-500 py-4 pb-8'>
            Sign in to your account
          </h1>
          <Form
            className="w-80 flex flex-col gap-4"
          >
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
                  "pl-2",
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
                  "pl-2",
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
            <a href="#" className="text-black-500 text-sm">Forgot password?</a>
            <Button
              type="submit"
              variant="solid"
              className="w-full mt-4 bg-login-button text-white"
            >
              Submit
            </Button>
          </Form>
          <p className="text-gray-500 pt-4">
            or sign in with
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center md:border md:border-gray-300">
              <Image
                src='/google-logo.svg'
                alt='google'
                width={27}
                height={27}
              />
            </div>
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center md:border md:border-gray-300">
              <Image
                src='/facebook-logo.svg'
                alt='facebook'
                width={17}
                height={26}
              />
            </div>
            <div className="flex bg-white p-2 rounded-md min-w-[86px] justify-center md:border md:border-gray-300">
              <Image
                src='/x-logo.svg'
                alt='facebook'
                width={27}
                height={27}
              />
            </div>
          </div>
          <p className="text-gray-500 pt-4">
            Don't have an account? <a href="/signup" className="text-green-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}