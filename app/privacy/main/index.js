import { useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";
import Form from 'next/form'
import CreateForm from './CreateForm';
import CookiePreferences from "../../Components/CookiePreferences/page";


export default function Main() {
  const [preferencesOpen, setPreferencesOpen] = useState(false);


  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center">
      <div className="relative flex flex-col w-full max-w-[60em] h-auto px-4 mb-10 bg-gray-900 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <header className="text-center py-8">
            <h1 className="text-[32px] font-gentium-book-plus">Website Privacy Policy</h1>
            <p className="text-sm font-maven-pro">Last updated January 24, 2025</p>
        </header>
        <main className="px-6 py-8">
          <section id="privacy-notice">
              <h3 className="text-2xl font-maven-pro">PRIVACY NOTICE</h3>
              <p className="mt-4">
                This privacy notice for <strong>CREATIVE COLLECTIVE</strong> (doing business as <strong>RiverCity Creatives </strong> 
                (“Company,” “we,” “us,” or “our”), describes how and why we might collect, store, use, and/or share 
                (“process“) your information when you use our services (“Services“), such as when you:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Visit our website at <a href="https://rivercitycreatives.com" target="_blank" className="text-blue-400 hover:underline">rivercitycreatives.com</a>, or any website of ours that links to this privacy notice</li>
                <li>Engage with us in other related ways ― including any sales, marketing, or events</li>
              </ul>
              <p className="mt-4">
                Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. 
                If you do not agree with our policies and practices, please do not use our Services. If you still have any 
                questions or concerns, please contact us at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>
              </p>
              <p className="mt-4">
                This privacy policy was created by <a href="https://termly.io/products/privacy-policy-generator/" className="text-blue-400 hover:underline">Termly’s Privacy Policy Generator.</a>
              </p>
          </section>

          <section id="key-points" className="mt-8">
            <h2 className="text-2xl font-maven-pro">SUMMARY OF KEY POINTS</h2>
            <p className="mt-4 italic">
              This summary provides key points from our privacy notice, but you can find out more details about any of these topics 
              by using our table of contents below to find the section you are looking for.
            </p>
            <ul className="list-none mt-2 flex flex-col gap-2">
              <li>
                <p>
                  <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with RiverCity Creatives and the Services, the choices you make, and the products and features you use.
                </p>
              </li>
              <li>
                <p>
                  <strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Do you receive any information from third parties?</strong> We may receive information from third parties, such as social media platforms, advertising networks, and analytics providers.
                </p>
              </li>
              <li>
                <p>
                  <strong>How do you process my information?</strong> We process your information to provide, improve, and personalize our services, comply with legal obligations, and protect our rights.
                </p>
              </li>
              <li>
                <p>
                  <strong>In what situations and with which types of parties do we share personal information?</strong> We may share your information with service providers, business partners, and legal authorities as required by law.
                </p>
              </li>
              <li>
                <p>
                  <strong>How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
                </p>
              </li>
              <li>
                <p>
                  <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
                </p>
              </li>
              <li>
                <p>
                  <strong>How do I exercise my rights?</strong> The easiest way to exercise your rights is by filling out our data subject request form available here: [DSAR Form URL], or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                </p>
              </li>
            </ul>
          </section>

          <section id="table-of-contents" className="mt-8">
            <h2 className="text-2xl font-maven-pro mb-4">TABLE OF CONTENTS</h2>
            <ul className="list-decimal mt-2 flex flex-col gap-2">
							<li className="ml-[20px]">
								<p><a href="#what-information-do-we-collect" className="text-blue-400 hover:underline">What Information Do We Collect?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#how-do-we-process-your-information" className="text-blue-400 hover:underline">How Do We Process Your Information?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#what-legal-bases-do-we-rely-on-to-process-your-information" className="text-blue-400 hover:underline">What Legal Bases Do We Rely On To Process Your Information?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#when-and-with-whom-do-we-share-your-personal-information" className="text-blue-400 hover:underline">When And With Whom Do We Share Your Personal Information?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#what-is-our-stance-on-third-party-websites" className="text-blue-400 hover:underline">What Is Our Stance On Third-Party Websites?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#do-we-use-cookies-and-other-tracking-technologies" className="text-blue-400 hover:underline">Do We Use Cookies And Other Tracking Technologies?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#how-do-we-handle-your-social-logins" className="text-blue-400 hover:underline">How Do We Handle Your Social Logins?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#is-your-information-transferred-internationally" className="text-blue-400 hover:underline">Is Your Information Transferred Internationally?</a></p>
							</li>
							<li className="ml-[20px]">
								<p><a href="#how-long-do-we-keep-your-information" className="text-blue-400 hover:underline">How Long Do We Keep Your Information?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#how-do-we-keep-your-information-safe" className="text-blue-400 hover:underline">How Do We Keep Your Information Safe?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#do-we-collect-information-from-minors" className="text-blue-400 hover:underline">Do We Collect Information From Minors?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#what-are-your-privacy-rights" className="text-blue-400 hover:underline">What Are Your Privacy Rights?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#controls-for-do-not-track-features" className="text-blue-400 hover:underline">Controls For Do-Not-Track Features</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#do-california-residents-have-specific-privacy-rights" className="text-blue-400 hover:underline">Do California Residents Have Specific Privacy Rights?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#do-virginia-residents-have-specific-privacy-rights" className="text-blue-400 hover:underline">Do Virginia Residents Have Specific Privacy Rights?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#do-we-make-updates-to-this-notice" className="text-blue-400 hover:underline">Do We Make Updates To This Notice?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#how-can-you-contact-us-about-this-notice" className="text-blue-400 hover:underline">How Can You Contact Us About This Notice?</a></p>
							</li>
							<li className="ml-[28px]">
								<p><a href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you" className="text-blue-400 hover:underline">How Can You Review, Update, Or Delete The Data We Collect From You?</a></p>
							</li>
            </ul>
          </section>

          <section id="what-information-do-we-collect" className="mt-8">
            <h2 className="text-2xl font-maven-pro">1. WHAT INFORMATION DO WE COLLECT?</h2>

            <h3 className="text-xl font-maven-pro mt-6">Personal information you disclose to us</h3>
            <p className="mt-4">
              <strong>In Short:</strong> <span className="italic">We collect personal information that you provide to us.</span>
            </p>
            <p className="mt-4">
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </p>
            <p className="mt-4">
              <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </p>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
              <li>Name and contact details (e.g., email address, phone number, physical address)</li>
              <li>Account credentials (e.g., username or account ID)</li>
              <li>Demographic information (e.g., age, gender, language preference)</li>
              <li>Technical data about your interactions with our website or app (e.g., IP address, browser type, pages visited)</li>
            </ul>
            <p className="mt-4">
              <strong>Sensitive Information.</strong> We do not process sensitive information.
            </p>
            <p className="mt-4">
              <strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: <a href="https://stripe.com/privacy" target="_blank" className="text-blue-400 hover:underline">Stripe Privacy Policy</a>.
            </p>
            <p className="mt-4">
              <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called <a href="#how-do-we-handle-your-social-logins" className="text-blue-400 hover:underline">“How Do We Handle Your Social Logins?”</a> below.
            </p>
            <p className="mt-4">
              <strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
            </p>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
              <li><strong>Geolocation Information.</strong> We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
              <li><strong>Mobile Device Access.</strong> We may request access or permission to certain features from your mobile device, including your mobile device’s bluetooth, calendar, camera, and other features. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
              <li><strong>Mobile Device Data.</strong> We automatically collect device information (such as your mobile device ID, model, manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model, Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID, and information about the features of our application(s) you accessed.</li>
              <li><strong>Push Notifications.</strong> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device’s settings.</li>
            </ul>
            <p className="mt-4">
              This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
            </p>
            <p className="mt-4">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </p>

            <h3 className="text-xl font-maven-pro mt-6">Information automatically collected</h3>
            <p className="mt-4">
              <strong>In Short:</strong> <span className="italic">Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</span>
            </p>
            <p className="mt-4">
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </p>
            <p className="mt-4">
              Like many businesses, we also collect information through cookies and similar technologies, including the use of Google Analytics. You can learn more about how Google Analytics collects and processes data by visiting <a href="https://www.google.com/policies/privacy/" target="_blank" className="text-blue-400 hover:underline">Google's Privacy Policy</a> and <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" className="text-blue-400 hover:underline">Google Analytics' Data Privacy and Security</a>.
            </p>
            <p className="mt-4">
              You can find out more about this in our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.
            </p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li><strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called “crash dumps”), and hardware settings.</li>
              <li><strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
              <li><strong>Location Data.</strong> We collect location data such as information about your device’s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device.</li>
            </ul>
          </section>

          <section id="how-do-we-process-your-information" className="mt-8">
            <h2 className="text-2xl font-maven-pro">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</span></p>
            
            <p className="mt-4"><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
            
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
              
              <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
              
              <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
              
              <li><strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
              
              <li><strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
              
              <li><strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
              
              <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
              
              <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see <a href="what-are-your-privacy-rights" className="text-blue-400 hover:underline">“What are Your Privacy Rights?”</a> below.</li>
              
              <li><strong>To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more. For more information see our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</li>
              
              <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
              
              <li><strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
              
              <li><strong>To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
              
              <li><strong>To save or protect an individual’s vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
            </ul>
          </section>

          <section id="what-legal-bases-do-we-rely-on-to-process-your-information" className="mt-8">
            <h2 className="text-2xl font-maven-pro">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</span></p>
            
            <p className="mt-4"><strong>If you are located in the EU or UK, this section applies to you.</strong></p>

            <p className="mt-4">The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
            
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li><strong>Consent. </strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
              
              <li><strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
              
              <li><strong>Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:</li>
              {/* MORE BULLET POINTS HERE */}
              <ul className="list-disc ml-6 my-2 flex flex-col gap-2">
                <li>Send users information about special offers and discounts on our products and services</li>
                <li>Develop and display personalized and relevant advertising content for our users</li>
                <li>Analyze how our services are used so we can improve them to engage and retain users</li>
                <li>Support our marketing activities</li>
                <li>Diagnose problems and/or prevent fraudulent activities</li>
                <li>Understand how our users use our products and services so we can improve user experience</li>
              </ul>
              
              <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
              
              <li><strong>Vital Interests. </strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
            </ul>

            <p className="mt-4">In legal terms, we are generally the “data controller” under European data protection laws of the personal information described in this privacy notice, since we determine the means and/or purposes of the data processing we perform. This privacy notice does not apply to the personal information we process as a “data processor” on behalf of our customers. In those situations, the customer that we provide services to and with whom we have entered into a data processing agreement is the “data controller” responsible for your personal information, and we merely process your information on their behalf in accordance with your instructions. If you want to know more about our customers’ privacy practices, you should read their privacy policies and direct any questions you have to them.</p>
            <p className="mt-4 italic">If you are located in Canada, this section applies to you.</p>
            <p className="mt-4">We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
            <p className="mt-4">In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
              <li>For investigations and fraud detection and prevention</li>
              <li>For business transactions provided certain conditions are met</li>
              <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
              <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
              <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
              <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
              <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
              <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
              <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
              <li>If the information is publicly available and is specified by the regulations</li>
            </ul>
          </section>

          <section id="when-and-with-whom-do-we-share-your-personal-information" className="mt-8">
            <h2 className="text-2xl font-maven-pro">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We may share information in specific situations described in this section and/or with the following categories of third parties.</span></p>
            
            <p className="mt-4"><strong>Vendors, Consultants, and Other Third-Party Service Providers. </strong>We may share your data with third-party vendors, service providers, contractors, or agents (“<strong>third parties</strong>”) who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct. The categories of third parties we may share personal information with are as follows:</p>

            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Ad Networks</li>
              <li>Affiliate Marketing Programs</li>
              <li>Cloud Computing Services</li>
              <li>Communication & Collaboration Tools</li>
              <li>Data Analytics Services</li>
              <li>Data Storage Service Providers</li>
              <li>Finance & Accounting Tools</li>
              <li>Government Entities</li>
              <li>Order Fulfillment Service Providers</li>
              <li>Payment Processors</li>
              <li>Performance Monitoring Tools</li>
              <li>Product Engineering & Design Tools</li>
              <li>Retargeting Platforms</li>
              <li>Sales & Marketing Tools</li>
              <li>Social Networks</li>
              <li>Testing Tools</li>
              <li>User Account Registration & Authentication Services</li>
              <li>Website Hosting Service Providers</li>
            </ul>

            <p className="mt-4">We also may need to share your personal information in the following situations:</p>

            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li><strong>Business Transfers. </strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              
              <li><strong>When we use Google Maps Platform APIs. </strong>We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). To find out more about Google’s Privacy Policy, please refer to this link. We use certain Google Maps Platform APIs to retrieve certain information when you make location-specific requests. A full list of what we use information for can be found in this section and in the previous section titled “HOW DO WE PROCESS YOUR INFORMATION?”. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document. The Google Maps Platform APIs that we use store and access cookies and other information on your devices. If you are a user currently in the European Economic Area (EU countries, Iceland, Liechtenstein and Norway) or the United Kingdom, please take a look at our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</li>
              
              <li><strong>Affiliates. </strong>We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
              
              <li><strong>Business Partners. </strong>We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              
              <li><strong>Other Users. </strong>When you share personal information by posting comments, contributions, or other content to our website or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. If you interact with other users of our Services and register for our Services through a social network (such as Facebook), your contacts on the social network will see your name, profile photo, and descriptions of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.</li>
              <li><strong>Offer Wall. </strong>Our application(s) may display a third-party hosted “offer wall.” Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for the acceptance and completion of an advertisement offer. Such an offer wall may appear in our application(s) and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will be brought to an external website belonging to other persons and will leave our application(s). A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account with the relevant reward.</li>
            </ul>
          </section>

          <section id="what-is-our-stance-on-third-party-websites" className="mt-8">
            <h2 className="text-2xl font-maven-pro">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.</span></p>
            
            <p className="mt-4">The Services, [including our offer wall], may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.</p>
          </section>

          <section id="do-we-use-cookies-and-other-tracking-technologies" className="mt-8">
            <h2 className="text-2xl font-maven-pro">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We may use cookies and other tracking technologies to collect and store your information.</span></p>
            
            <p className="mt-4">We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</p>
          </section>

          <section id="how-do-we-handle-your-social-logins" className="mt-8">
            <h2 className="text-2xl font-maven-pro">7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">If you choose to register or log in to our services using a social media account, we may have access to certain information about you.</span></p>
            
            <p className="mt-4">Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform. If you log in using Facebook, we may also request access to other permissions related to your account, such as your friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission.</p>
            <p className="mt-4">We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
          </section>

          <section id="is-your-information-transferred-internationally" className="mt-8">
            <h2 className="text-2xl font-maven-pro">8. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We may transfer, store, and process your information in countries other than your own.</span></p>
            
            <p className="mt-4">Our servers are located in the United States of America. If you are accessing our Services from outside the United States of America, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information (see <a href="when-and-with-whom-do-we-share-your-personal-information" className="text-blue-400 hover:underline">“When and with Whom do we Share Your Personal Information?”</a> above), in other countries.</p>
            <p className="mt-4">If you are a resident in the European Economic Area (EEA) or United Kingdom (UK), then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this privacy notice and applicable law.</p>
            <p className="mt-4">European Commission’s Standard Contractual Clauses:</p>
            <p className="my-4">We have implemented measures to protect your personal information, including by using the European Commission’s Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all personal information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. Our Data Processing Agreements that include Standard Contractual Clauses are available here. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.</p>
            <strong className="mt-4">Internation Data Transfers:</strong>
            <p className="mt-4">RiverCity Creatives is committed to protecting personal information during international transfers. While we do not currently operate under Binding Corporate Rules (BCRs), we ensure that all data transfers comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the UK Data Protection Act. For international transfers outside the European Economic Area (EEA), the UK, and Switzerland, we rely on approved mechanisms such as Standard Contractual Clauses (SCCs) and other appropriate safeguards to ensure an adequate level of protection for your personal information.</p>
            <p className="mt-4">If you have any questions or would like more information about how we protect personal information during international transfers, please contact us using the details provided below.</p>
          </section>

          <section id="how-long-do-we-keep-your-information" className="mt-8">
            <h2 className="text-2xl font-maven-pro">9. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</span></p>
            
            <p className="mt-4">We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us / 12 months past the termination of the user’s account / 12 months past the start of the idle period of the user’s account.<a href="when-and-with-whom-do-we-share-your-personal-information" className="text-blue-400 hover:underline">“When and with Whom do we Share Your Personal Information?”</a> above), in other countries.</p>
            <p className="mt-4">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
          </section>

          <section id="how-do-we-keep-your-information-safe" className="mt-8">
            <h2 className="text-2xl font-maven-pro">10. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We aim to protect your personal information through a system of organizational and technical security measures.</span></p>
            
            <p className="mt-4">We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
          </section>

          <section id="do-we-collect-information-from-minors" className="mt-8">
            <h2 className="text-2xl font-maven-pro">11. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">We do not knowingly collect data from or market to children under 18 years of age.</span></p>
            
            <p className="mt-4">We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a></p>
          </section>

          <section id="what-are-your-privacy-rights" className="mt-8">
            <h2 className="text-2xl font-maven-pro">12. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</span></p>
            
            <p className="mt-4">In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section <a href="how-can-you-contact-us-about-this-notice" className="text-blue-400 hover:underline">“How can you Contact us About this Notice?”</a> below.</p>
            <p className="mt-4">We will consider and act upon any request in accordance with applicable data protection laws.</p>
            <p className="mt-4">If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="text-blue-400 hover:underline">here.</a></p>
            <p className="mt-4">If you are located in Switzerland, the contact details for the data protection authorities are available <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" className="text-blue-400 hover:underline">here.</a></p>
            <p className="mt-6"><strong>Withdrawing your consent: </strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <a href="how-can-you-contact-us-about-this-notice" className="text-blue-400 hover:underline">“How can you Contact us About this Notice?”</a> below or updating your preferences.</p>
            <p className="mt-4">However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
            <p className="mt-6"><strong>Opting out of marketing and promotional communications: </strong>You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, replying “STOP” or “UNSUBSCRIBE” to the SMS messages that we send, or by contacting us using the details provided in the section <a href="how-can-you-contact-us-about-this-notice" className="text-blue-400 hover:underline">“How can you Contact us About this Notice?”</a> below. You will then be removed from the marketing lists — however, we may still communicate with you, for example to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</p>
            <h3 className="text-xl font-maven-pro mt-6">Account Information</h3>
            <p className="mt-4">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Log in to your account settings and update your user account.</li>
              <li>Contact us using the contact information provided.</li>
            </ul>
            <p className="mt-4">Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
            <p className="mt-6"><strong>Cookies and similar technologies: </strong>Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt out of interest-based advertising by advertisers on our Services click <a href="http://www.aboutads.info/choices/" className="text-blue-400 hover:underline">here.</a>. For further information, please see our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</p>
            <p className="mt-4">If you have questions or comments about your privacy rights, you may email us at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>.</p>
          </section>

          <section id="controls-for-do-not-track-features" className="mt-8">
            <h2 className="text-2xl font-maven-pro">13. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            
            <p className="mt-4">Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
          </section>

          <section id="do-california-residents-have-specific-privacy-rights" className="mt-8">
            <h2 className="text-2xl font-maven-pro">14. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</span></p>
            
            <p className="mt-4">California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
            <p className="mt-4">If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).</p>

            <h3 className="text-xl font-maven-pro mt-6">CCPA Privacy Notice</h3>
            <p className="mt-4">The California Code of Regulations defines a “resident” as:</p>
            <p className="mt-4">(1) every individual who is in the State of California for other than a temporary or transitory purpose and</p>
            <p className="mt-4">(2) every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</p>
            <p className="mt-4">All other individuals are defined as “non-residents.”</p>
            <p className="mt-4">If this definition of “resident” applies to you, we must adhere to certain rights and obligations regarding your personal information.</p>

            <h3 className="text-xl font-maven-pro mt-6">What categories of personal information do we collect?</h3>
            <p className="mt-4">We have collected the following categories of personal information in the past twelve (12) months:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-200">Category</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-200">Description</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-200">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">A. Identifiers</td>
                    <td className="px-4 py-2 border border-gray-200">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                    <td className="px-4 py-2 border border-gray-200">YES</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">B. Personal information categories listed in the California Customer Records statute</td>
                    <td className="px-4 py-2 border border-gray-200">Name, contact information, education, employment, employment history, and financial information</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">C. Protected classification characteristics under California or federal law</td>
                    <td className="px-4 py-2 border border-gray-200">Gender and date of birth</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">D. Commercial information</td>
                    <td className="px-4 py-2 border border-gray-200">Transaction information, purchase history, financial details, and payment information</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">E. Biometric information</td>
                    <td className="px-4 py-2 border border-gray-200">Fingerprints and voiceprints</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">F. Internet or other similar network activity</td>
                    <td className="px-4 py-2 border border-gray-200">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                    <td className="px-4 py-2 border border-gray-200">YES</td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">G. Geolocation data</td>
                    <td className="px-4 py-2 border border-gray-200">Device location</td>
                    <td className="px-4 py-2 border border-gray-200">YES</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                    <td className="px-4 py-2 border border-gray-200">Images and audio, video or call recordings created in connection with our business activities</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">I. Professional or employment-related information</td>
                    <td className="px-4 py-2 border border-gray-200">Business contact details in order to provide you our services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">J. Education Information</td>
                    <td className="px-4 py-2 border border-gray-200">Student records and directory information</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">K. Inferences drawn from other personal information</td>
                    <td className="px-4 py-2 border border-gray-200">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                    <td className="px-4 py-2 border border-gray-200">YES</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border border-gray-200">L. Sensitive personal information</td>
                    <td className="px-4 py-2 border border-gray-200">Account login information, drivers’ licenses, health data, precise geolocation, racial or ethnic origin, religious or philosophical beliefs, and sex life or sexual orientation</td>
                    <td className="px-4 py-2 border border-gray-200">NO</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">We will use and retain the collected personal information as needed to provide the Services or for:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Category A – 26 months</li>
              <li>Category B – N/A</li>
              <li>Category C – N/A</li>
              <li>Category D – N/A</li>
              <li>Category E – N/A</li>
              <li>Category F – 26 months</li>
              <li>Category G – 26 months</li>
              <li>Category H – N/A</li>
              <li>Category I – N/A</li>
              <li>Category J – N/A</li>
              <li>Category K – 26 months</li>
              <li>Category L – N/A</li>
            </ul>
            <p className="mt-4">Category L information may be used, or disclosed to a service provider or contractor, for additional, specified purposes. You have the right to limit the use or disclosure of your sensitive personal information.</p>
            <p className="mt-4">We may also collect other personal information outside of these categories instances where you interact with us in person, online, or by phone or mail in the context of:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Receiving help through our customer support channels;</li>
              <li>Participation in customer surveys or contests; and</li>
              <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>

            <h3 className="text-xl font-maven-pro mt-6">How do we use and share your personal information?</h3>
            <p className="mt-4">RiverCity Creatives collects and shares your personal information through:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Targeting cookies/Marketing cookies</li>
              <li>Social media cookies</li>
              <li>Beacons/Pixels/Tags</li>
              <li>Click redirects:</li>
              <li>Social media plugins:  We use social media features, such as a “Like” button, and widgets, such as a “Share” button in our Services. Such features may process your Internet Protocol (IP) address and track which page you are visiting on our website. We may place a cookie to enable the feature to work correctly. If you are logged in on a certain social media platform and you interact with a widget or button belonging to that social media platform, this information may be recorded to your profile of such social media platform. To avoid this, you should log out from that social media platform before accessing or using the Services. Social media features and widgets may be hosted by a third party or hosted directly on our Services. Your interactions with these features are governed by the privacy notices of the companies that provide them. By clicking on one of these buttons, you agree to the use of this plugin and consequently the transfer of personal information to the corresponding social media service. We have no control over the essence and extent of these transmitted data or their additional processing.</li>
            </ul>
            <p className="mt-4">More information about our data collection and sharing practices can be found in this privacy notice and our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</p>
            <p className="mt-4">You can opt out from the selling or sharing of your personal information by disabling cookies in Cookie Preference Settings.</p>
            <p className="mt-4">You may contact us by email at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>, by calling toll-free at 210-730-6232, by visiting <a href="#dpo-contact-form" className="text-blue-400 hover:underline">our Contact Form</a>, or by referring to the contact details at the bottom of this document.</p>
            <p className="mt-4">If you are using an authorized agent to exercise your right to opt out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.</p>

            <h3 className="text-xl font-maven-pro mt-6">Will your information be shared with anyone else?</h3>
            <p className="mt-4">We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf, following the same strict privacy protection obligations mandated by the CCPA.</p>
            <p className="mt-4">We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be “selling” of your personal information.</p>
            <p className="mt-4">RiverCity Creatives has disclosed the following categories of personal information to third parties for a business or commercial purpose in the preceding twelve (12) months:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Category A. Identifiers, such as contact details like your real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name.</li>
              <li>Category B. Personal information, as defined in the California Customer Records law, such as your name, contact information, education, employment, employment history, and financial information.</li>
              <li>Category C. Characteristics of protected classifications under California or federal law, such as gender or date of birth.</li>
              <li>Category D. Commercial information, such as transaction information, purchase history, financial details, and payment information.</li>
              <li>Category E. Biometric information, such as fingerprints and voiceprints.</li>
              <li>Category F. Internet or other electronic network activity information, such as browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements.</li>
              <li>Category G. Geolocation data, such as device location.</li>
              <li>Category H. Audio, electronic, visual, and similar information, such as images and audio, video, or call recordings created in connection with our business activities.</li>
              <li>Category I. Professional or employment-related information, such as business contact details in order to provide you our services at a business level or job title, work history, and professional qualifications if you apply for a job with us.</li>
              <li>Category J. Education information, such as student records and directory information.</li>
              <li>Category K. Inferences drawn from any of the personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics.</li>
              <li>Category L. Sensitive personal information, such as account login information, drivers’ licenses, health data, precise geolocation, racial or ethnic origin, religious or philosophical beliefs, and sex life or sexual orientation.</li>
            </ul>
            <p className="mt-4">The categories of third parties to whom we disclosed personal information for a business or commercial purpose can be found under <a href="when-and-with-whom-do-we-share-your-personal-information" className="text-blue-400 hover:underline">“When and with Whom do we Share your Personal Information?”</a>.</p>
            <p className="mt-4">RiverCity Creatives has not sold or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months.</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Category A. Identifiers, such as contact details like your real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name.</li>
              <li>Category B. Personal information, as defined in the California Customer Records law, such as your name, contact information, education, employment, employment history, and financial information.</li>
              <li>Category C. Characteristics of protected classifications under California or federal law, such as gender or date of birth.</li>
              <li>Category D. Commercial information, such as transaction information, purchase history, financial details, and payment information.</li>
              <li>Category E. Biometric information, such as fingerprints and voiceprints.</li>
              <li>Category F. Internet or other electronic network activity information, such as browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements.</li>
              <li>Category G. Geolocation data, such as device location.</li>
              <li>Category H. Audio, electronic, visual, and similar information, such as images and audio, video, or call recordings created in connection with our business activities.</li>
              <li>Category I. Professional or employment-related information, such as business contact details in order to provide you our services at a business level or job title, work history, and professional qualifications if you apply for a job with us.</li>
              <li>Category J. Education information, such as student records and directory information.</li>
              <li>Category K. Inferences drawn from any of the personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics.</li>
              <li>Category L. Sensitive personal information, such as account login information, drivers’ licenses, health data, precise geolocation, racial or ethnic origin, religious or philosophical beliefs, and sex life or sexual orientation.</li>
            </ul>

            <h3 className="text-xl font-maven-pro mt-6">Your rights with respect to your personal data</h3>
            <p className="mt-4"><strong>Right to request deletion of the data — Request to delete</strong></p>
            <p className="mt-4">You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.</p>
            <p className="mt-4"><strong>Right to be informed — Request to know</strong></p>
            <p className="mt-4">Depending on the circumstances, you have a right to know:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>whether we collect and use your personal information;</li>
              <li>the categories of personal information that we collect;</li>
              <li>the purposes for which the collected personal information is used;</li>
              <li>whether we sell or share personal information to third parties;</li>
              <li>the categories of personal information that we sold, shared, or disclosed for a business purpose;</li>
              <li>the categories of third parties to whom the personal information was sold, shared, or disclosed for a business purpose;</li>
              <li>the business or commercial purpose for collecting, sharing, or selling personal information; and</li>
              <li>the specific pieces of personal information we collected about you.</li>
            </ul>
            <p className="mt-4">In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.</p>
            <p className="mt-4"><strong>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</strong></p>
            <p className="mt-4">We will not discriminate against you if you exercise your privacy rights.</p>
            <p className="mt-4"><strong>Right to Limit Use and Disclosure of Sensitive Personal Information</strong></p>
            <p className="mt-4">We do not process consumer’s sensitive personal information.</p>
            <p className="mt-4"><strong>Verification process</strong></p>
            <p className="mt-4">Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g., phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.</p>
            <p className="mt-4">We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.</p>
            <p className="mt-4"><strong>Other privacy rights</strong></p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>You may object to the processing of your personal information.</li>
              <li>You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the information.</li>
              <li>You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
              <li>You may request to opt out from future selling or sharing of your personal information to third parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request submission.</li>
            </ul>
            <p className="mt-4">To exercise these rights, you can contact us by email at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>, by calling toll-free at 210-730-6232, by visiting <a href="#dpo-contact-form" className="text-blue-400 hover:underline">our Contact Form</a>, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</p>

            <h3 className="text-xl font-maven-pro mt-6">Financial Incentives</h3>
            <p className="mt-4">“Financial incentive” means a program, benefit, or other offering, including payments to consumers as compensation, for the disclosure, deletion, sharing, or sale of personal information.</p>
            <p className="mt-4">The law permits financial incentives or a price or service difference if it is reasonably related to the value of the consumer’s data. A business must be able to explain how the financial incentive or price or service difference is reasonably related to the value of the consumer’s data. The explanation must include:</p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>a good-faith estimate of the value of the consumer’s data that forms the basis for offering the financial incentive or price or service difference; and</li>
              <li>a description of the method the business used to calculate the value of the consumer’s data.</li>
            </ul>
            <p className="mt-4">We may decide to offer a financial incentive (e.g., price or service difference) in exchange for the retention, sale or sharing of a consumer’s personal information.</p>
            <p className="mt-4">If we decide to offer a financial incentive, we will notify you of such financial incentive and explain the price difference, as well as material terms of the financial incentive or price of service difference, including the categories of personal information that are implicated by the financial incentive or price or service difference.</p>
            <p className="mt-4">If you choose to participate in the financial incentive you can withdraw from the financial incentive at any time by emailing us at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>, by calling us toll-free at 210-730-6232, by visiting <a href="#dpo-contact-form" className="text-blue-400 hover:underline">our Contact Form</a>, or by referring to the contact details at the bottom of this document.</p>

            <h3 className="text-xl font-maven-pro mt-6">Metrics</h3>
            <p className="mt-4">Our metrics for all CCPA requests received for the previous calendar year can be found here: [Metrics URL].</p>
          </section>

          <section id="do-virginia-residents-have-specific-privacy-rights" className="mt-8">
            <h2 className="text-2xl font-maven-pro">15. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">Yes, if you are a resident of Virginia, you may be granted specific rights regarding access to and use of your personal information.</span></p>
            
            <h3 className="text-xl font-maven-pro mt-6">Virginia CDPA Privacy Notice</h3>
            <p className="mt-4">Under the Virginia Consumer Data Protection Act (CDPA):</p>
            <p className="mt-4">“Consumer” means a natural person who is a resident of the Commonwealth acting only in an individual or household context. It does not include a natural person acting in a commercial or employment context.</p>
            <p className="mt-4">“Personal data” means any information that is linked or reasonably linkable to an identified or identifiable natural person. “Personal data” does not include de-identified data or publicly available information.</p>
            <p className="mt-4">“Sale of personal data” means the exchange of personal data for monetary consideration.</p>
            <p className="mt-4">If this definition of “consumer” applies to you, we must adhere to certain rights and obligations regarding your personal data.</p>
            <p className="mt-4">The information we collect, use, and disclose about you will vary depending on how you interact with RiverCity Creatives and our Services. To find out more, please visit the following sections above:</p>
            <ol className="list-decimal pl-6 mt-4 flex flex-col gap-2">
              <li><a href="what-information-do-we-collect" className="text-blue-400 hover:underline">What Information do we Collect?</a></li>
              <li><a href="how-do-we-process-your-information" className="text-blue-400 hover:underline">How do we Process your Information?</a></li>
              <li style={{ listStyleType: 'none' }}>
                <span className="before:content-['4.'] before:-ml-[18px] before:mr-1">
                  <a href="when-and-with-whom-do-we-share-your-personal-information" className="text-blue-400 hover:underline">When and with Whom do we Share your Personal Information</a>
                </span>
              </li>
            </ol>
            <p className="mt-4"><strong>Your rights with respect to your personal data</strong></p>
            <ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
              <li>Right to be informed whether or not we are processing your personal data</li>
              <li>Right to access your personal data</li>
              <li>Right to correct inaccuracies in your personal data</li>
              <li>Right to request deletion of your personal data</li>
              <li>Right to obtain a copy of the personal data you previously shared with us</li>
              <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects.</li>
            </ul>
            <p className="mt-4">RiverCity Creatives has not sold any personal data to third parties for business or commercial purposes. RiverCity Creatives will not sell personal data in the future belonging to website visitors, users, and other consumers. </p>
            <p className="mt-4"><strong>Exercise your rights provided under the Virginia CDPA</strong></p>
            <p className="mt-4">More information about our data collection and sharing practices can be found in this privacy notice and our <a href="#cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</a>.</p>
            <p className="mt-4">You may contact us by email at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>, by visiting <a href="#dpo-contact-form" className="text-blue-400 hover:underline">our Contact Form</a>, or by referring to the contact details at the bottom of this document.</p>
            <p className="mt-4">If you are using an authorized agent to exercise your rights, we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.</p>
            <p className="mt-4"><strong>Verification process</strong></p>
            <p className="mt-4">We may request that you provide additional information reasonably necessary to verify you and your consumer’s request. If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request.</p>
            <p className="mt-4">Upon receiving your request, we will respond without undue delay, but in all cases, within forty-five (45) days of receipt. The response period may be extended once by forty-five (45) additional days when reasonably necessary. We will inform you of any such extension within the initial 45-day response period, together with the reason for the extension.</p>
            <p className="mt-4"><strong>Right to appeal</strong></p>
            <p className="mt-4">If we decline to take action regarding your request, we will inform you of our decision and reasoning behind it. If you wish to appeal our decision, please email us at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>. Within sixty (60) days of receipt of an appeal, we will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may contact the Attorney General to <a href="https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint" className="text-blue-400 hover:underline">submit a complaint</a>.</p>
          </section>

          <section id="do-we-make-updates-to-this-notice" className="mt-8">
            <h2 className="text-2xl font-maven-pro">16. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            <p className="mt-6"><strong>In Short:</strong> <span className="italic">Yes, we will update this notice as necessary to stay compliant with relevant laws.</span></p>
            
            <p className="mt-4">We may update this privacy notice from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
          </section>

          <section id="how-can-you-contact-us-about-this-notice" className="mt-8">
            <h2 className="text-2xl font-maven-pro">17. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            <p className="mt-6">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at <a href="mailto:contact@rivercitycreatives.com" className="text-blue-400 hover:underline">contact@rivercitycreatives.com</a>, by phone at 210-730-6232, or by post to:</p>
            
            <p className="mt-4">COLLECTIVE CREATIVE LLC</p>
            <p className="">RiverCity Creatives</p>
            <p className="">5900 Balcones Drive STE 100</p>
            <p className="">Austin, TX 78731</p>
            <p className="">United States of America</p>
          </section>
        </main>
      </div>
      <div className="relative flex flex-col justify-center items-center w-full h-auto px-4 pb-10 bg-gray-700 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <header id="cookie-policy" className="text-center py-8 max-w-[60em]">
          <h2 className="text-[32px] font-gentium-book-plus">Website Cookie Policy</h2>
          <p className="text-sm font-maven-pro">Last updated January 24, 2025</p>
        </header>
				<section className='px-6 pb-8 max-w-[60em]'>
					<h3 className="text-xl font-maven-pro mt-6">What is a Cookie?</h3>
					<p className="mt-4">A cookie is a small data file stored in your computer, tablet or smartphone. A cookie is not a program and cannot carry harmful malware or viruses.</p>
					<h3 className="text-xl font-maven-pro mt-6">How Our Website Utilizes Cookies</h3>
					<p className="mt-4">Cookies are essential for certain functionalities of our website. They also give us insights into your visit, allowing us to continuously improve and tailor your experience based on your preferences and interests. For instance, cookies help remember items in your shopping cart, whether you've visited before, your login status, and your preferred language or currency. Additionally, cookies enable us to personalize advertisements for you on other platforms. Overall, cookies enhance our services by providing you with relevant content.</p>
					<p className="mt-4">We categorize the use of cookies into three main areas:</p>
					<ol className="list-decimal pl-6 mt-4 flex flex-col gap-2">
						<li>Functional</li>
						<li>Statistical</li>
						<li>Marketing</li>
					</ol>
					<h3 className="text-xl font-maven-pro mt-6">Cookie Storage Duration</h3>
					<p className="mt-4">The storage duration of cookies varies based on the specific type and the time of your last visit. Once a cookie expires, it is automatically deleted. The lifespan of each cookie is outlined in our cookie policy.</p>
					<h3 className="text-xl font-maven-pro mt-6">Managing or Deleting Cookies</h3>
					<p className="mt-4">You can block all or specific third-party cookies at any time by adjusting your browser settings on your device. The exact process depends on your browser (e.g., Chrome, Firefox, Safari) and device type (e.g., desktop, tablet, smartphone). However, blocking cookies may impact certain features and services on our website that rely on them. <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:underline">You can opt-out of cookies from Google Analytics here</a>.</p>
					<h3 className="text-xl font-maven-pro mt-6">How to Delete Cookies</h3>
					<p className="mt-4">If you've previously accepted cookies, you can remove them at any time. The steps vary depending on the browser and device you're using:</p>
					<ul className="list-disc pl-6 mt-4 flex flex-col gap-2">
						<li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d#ie=ie-11" className="text-blue-400 hover:underline">Internet Explorer</a></li>
						<li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" className="text-blue-400 hover:underline">Microsoft Edge</a></li>
						<li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US" className="text-blue-400 hover:underline">Mozilla Firefox</a></li>
						<li><a href="https://support.google.com/chrome/answer/95647?hl=en" className="text-blue-400 hover:underline">Google Chrome</a></li>
						<li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-blue-400 hover:underline">Opera</a></li>
						<li><a href="https://support.apple.com/en-us/105082" className="text-blue-400 hover:underline">Safari</a></li>
						<li><a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" className="text-blue-400 hover:underline">Flash cookies</a></li>
						<li><a href="https://support.apple.com/en-us/105082" className="text-blue-400 hover:underline">Apple</a></li>
						<li><a href="https://discover.hubpages.com/technology/How-to-delete-internet-cookies-on-your-Droid-or-any-Android-device" className="text-blue-400 hover:underline">Android</a></li>
						<li><a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&hl=en" className="text-blue-400 hover:underline">Chrome, Android</a></li>
					</ul>
					<p className="mt-4">Instructions are typically found under "Settings" → "Security and Privacy," though this may differ based on your browser.</p>
					<h3 className="text-xl font-maven-pro mt-6">Changing Your Cookie Consent</h3>
					<p className="mt-4">You can update your cookie preferences by either deleting cookies from your browser or modifying your previous consent via this <a onClick={() => setPreferencesOpen(true)} className="text-blue-400 hover:underline">link</a>.</p>
          <CookiePreferences isOpen={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
					<p className="mt-4"><strong>Note: </strong>If you use multiple browsers, you will need to adjust settings for each one individually.</p>
					<h3 className="text-xl font-maven-pro mt-6">Have Questions?</h3>
					<p className="mt-4">For inquiries or comments regarding our cookie policy or data processing practices, feel free to contact us.</p>
					<p className="mt-4">The most recent update to this cookie policy was on <strong>January 25, 2025</strong>.</p>
				</section>
      </div>
			<div className="relative bg-gray-900 flex flex-col w-full max-w-[60em] h-auto px-4 pb-10 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <header id="data-subject-request" className="text-center py-8">
          <h2 className="text-[32px] font-gentium-book-plus">Data Subject Request</h2>
        </header>
				<section id="dpo-contact-form" className='px-6 py-8'>
					<CreateForm />
				</section>
      </div>
    </div>
  );
}