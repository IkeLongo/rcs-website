
import { ContactFormGridWithDetails } from "@/app/components/layouts/contact/contact-ui";
import Footer from "@/app/components/layouts/footer/footer";

export default function ContactPage() {
  return (
    <div className="pt-20 bg-alice-blue-500">
      <ContactFormGridWithDetails />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}
