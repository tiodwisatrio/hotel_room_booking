import { Metadata } from "next";
import HeaderSection from "@/components/HeaderSection";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};
const ContactPage = () => {
  return (
    <div className="px-8">
      {/* <HeaderSection
        title="Contact Us"
        subtitle="Lorem ipsum dolor sit amet."
      /> */}
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <h1 className="text-lg text-white mb-3 opacity-70 font-medium">
              Contact Us
            </h1>
            <h1 className="text-5xl font-bold text-white  mb-4">
              Get in touch today
            </h1>
            <p className="text-white opacity-70 py-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              natus omnis dolorem, perspiciatis voluptas accusantium.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none bg-[#1a1b1c] text-white p-3 shadow-sm rounded-sm">
                  <IoMailOutline className="size-6" />
                </div>
                <div className="flex-1 text-white">
                  <h4 className="text-lg font-semibold mb-1">Email :</h4>
                  <p>email-use@example.com</p>
                </div>
              </li>

              <li className="flex gap-5">
                <div className="flex-none bg-[#1a1b1c] text-white p-3 shadow-sm rounded-sm">
                  <IoCallOutline className="size-6" />
                </div>
                <div className="flex-1 text-white">
                  <h4 className="text-lg font-semibold mb-1">Phone Number :</h4>
                  <p>+62 879-5960-4365</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-[#1a1b1c] text-white p-3 shadow-sm rounded-sm">
                  <IoLocationOutline className="size-6" />
                </div>
                <div className="flex-1 text-white">
                  <h4 className="text-lg font-semibold mb-1">Address :</h4>
                  <p>
                    Jl. Jaten, Kec. Sendangadi, Kab. Sleman, Daerah Istimewa
                    Yogyakarta
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
