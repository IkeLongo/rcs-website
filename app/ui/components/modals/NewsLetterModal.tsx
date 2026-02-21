// /app/ui/components/modals/NewsLetterModal.tsx
"use client";

import React from "react";
import EmailLottie from "@/app/ui/components/animations/email-lottie";
import HandshakeLottie from "@/app/ui/components/animations/handshake-lottie";

import { useState, useEffect } from "react";

export function NewsLetterModal({ open, onClose, initialEmail, onSubmit }: {
	open: boolean;
	onClose: () => void;
	initialEmail: string;
	onSubmit: (payload: { email: string; firstName: string }) => Promise<void>;
}) {

	const [step, setStep] = useState(1);
	const [modalEmail, setModalEmail] = useState(initialEmail);
	const [firstName, setFirstName] = useState("");
	const [consentChecked, setConsentChecked] = useState(false);
	const [showConsentError, setShowConsentError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

	useEffect(() => {
    // Only reset the modal when it first opens (transitions from false to true)
    // Don't reset if initialEmail changes while modal is already open
    if (open) {
      setModalEmail(initialEmail);
      setStep(1);
      setFirstName("");
      setConsentChecked(false);
      setShowConsentError(false);
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [open]); // Remove initialEmail from dependencies to prevent reset during step 3
  
  // Separate effect to update email only when modal first opens
  useEffect(() => {
    if (open && step === 1) {
      setModalEmail(initialEmail);
    }
  }, [initialEmail, open, step]);

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Blurred background */}
			<div
				className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			{/* Modal content */}
			<div className="relative z-10 bg-white rounded-2xl shadow-2xl mx-2 p-4 md:p-8 md:pt-12 md:pb-12 max-w-3xl w-full min-h-[200px] md:min-h-[400px] flex items-center">
				{/* Exit icon button */}
				<button
					type="button"
					aria-label="Close modal"
					onClick={onClose}
					className="absolute top-2 right-3 text-navy-400 hover:text-navy-700 focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-full p-1 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="absolute top-2 left-4 text-navy-500 hover:text-navy-700 font-semibold text-sm flex items-center gap-1 transition-colors z-20"
            style={{zIndex: 30}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            Back
          </button>
        )}
				<div className="flex flex-col md:flex-row flex-1 items-stretch overflow-x-hidden">
					<div className="flex flex-col justify-center md:flex-grow min-w-0 relative min-h-[300px]">
						<div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out overflow-y-auto ${
							step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
						}`}>
							<form className="flex flex-col items-center w-full px-2" onSubmit={e => { 
                e.preventDefault();
                setStep(2); 
              }}>
								<label htmlFor="modal-email" className="font-semibold text-navy-700 text-md2 font-maven-pro mb-4 text-left leading-tight">
									What's the best email address to send this checklist to?
								</label>
								<div className="relative w-full mb-4">
									<input
										id="modal-email"
										type="email"
										required
										value={modalEmail}
										onChange={e => setModalEmail(e.target.value)}
										className="w-full rounded-xl border-2 border-navy-500 bg-transparent h-12 pl-4 pr-[120px] text-navy-800 text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
										placeholder="Enter your email"
										autoFocus={step === 1}
									/>
									<button
										type="submit"
										className="absolute top-1/2 right-[6px] -translate-y-1/2 bg-lime-500 text-navy-900 font-semibold !rounded-lg px-5 h-9 shadow-sm hover:bg-lime-400 transition-colors flex items-center"
										>
											Next
										</button>
								</div>
							</form>
						</div>
						<div className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 ease-in-out overflow-y-auto ${
							step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
						}`}>
							<form className="flex flex-col items-start w-full px-2"
								onSubmit={async (e) => {
                  e.preventDefault();

                  if (!consentChecked) {
                    setShowConsentError(true);
                    return;
                  }

                  setShowConsentError(false);
                  setSubmitError(null);
                  setIsSubmitting(true);

                  try {
                    await onSubmit({ email: modalEmail, firstName });
                    setStep(3); // ✅ show congrats
                  } catch (err) {
                    setSubmitError("Something went wrong. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
							>
                <label htmlFor="modal-firstname" className="font-semibold text-navy-700 text-md2 font-maven-pro mb-4 text-left leading-tight">
                  What's your first name so that we can address you properly?
                </label>
								<div className="relative w-full mb-4">
									<input
										id="modal-firstname"
										type="text"
										required
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
										className="w-full rounded-xl border-2 border-navy-500 bg-transparent h-12 pl-4 pr-[120px] text-navy-800 text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
										placeholder="First Name"
										autoFocus={step === 2}
									/>
									<button
										type="submit"
                    disabled={isSubmitting}
										className="absolute top-1/2 right-[6px] -translate-y-1/2 bg-lime-500 text-navy-900 font-semibold !rounded-lg px-5 h-9 shadow-sm hover:bg-lime-400 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isSubmitting ? "Sending..." : "Get My Checklist"}
									</button>
								</div>
								<div className="w-full max-w-md self-start">
									<div className="flex items-start w-full mt-2 font-avenir">
										<input
											id="modal-consent"
											type="checkbox"
											checked={consentChecked}
											onChange={e => {
												setConsentChecked(e.target.checked);
												console.log('Consent checkbox changed:', e.target.checked);
												if (e.target.checked) setShowConsentError(false);
											}}
											className="mt-1 mr-2 accent-lime-500"
											required
										/>
										<label htmlFor="modal-consent" className="text-sm text-gray-700 leading-tight">
											By providing your information you agree to allow RiverCity Creatives, and/or its 
											partners to contact you by mail, phone, email, or text; even if the phone 
											number is present on a state or national Do Not Call list. By submitting 
											this information you agree to our 
											<a href="/privacy" className="underline hover:text-navy-700"> Privacy Policy </a> 
											and <a href="/terms" className="underline hover:text-navy-700"> Terms of Service</a>.
										</label>
									</div>
									{showConsentError && (
										<div className="text-xs text-red-600 mt-2 w-full text-left">
											Please check the consent box to continue.
										</div>
									)}
                  {submitError && (
                    <div className="text-xs text-red-600 mt-2 w-full text-left">
                      {submitError}
                    </div>
                  )}
								</div>
			        </form>
            </div>
            {/* Step 3: Success Congratulations */}
						<div className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
              step === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
              <div className="mb-6">
                {/* You can use a Lottie animation here if desired */}
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#A3E635"/>
                  <path d="M7 13l3 3 7-7" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="!font-maven-pro text-2xl font-bold !text-navy-700 mb-2">Congratulations {firstName}!</h2>
              <p className="!text-gray-950 text-md text-center mb-4">Your checklist is on its way to <span className="font-semibold">{modalEmail}</span>.</p>
              <button
                onClick={onClose}
                className="mt-4 bg-lime-500 text-navy-900 font-semibold rounded-lg px-6 h-10 shadow-sm hover:bg-lime-400 transition-colors"
              >
                Close
              </button>
            </div>
					</div>
					{/* Hide Lottie animations on step 3 */}
					{step !== 3 && (
						<div className="flex justify-end self-center flex-shrink-0 ml-6 relative overflow-hidden w-40 h-40">
							<div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
								step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
							}`}>
								<EmailLottie className="w-40 h-40" />
							</div>
							<div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
								step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
							}`}>
								<HandshakeLottie className="w-40 h-40" />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
