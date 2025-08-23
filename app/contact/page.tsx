import { Metadata } from "next";
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
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1
              className="text-lg text-white mb-3 opacity-70 font-medium"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Contact Us
            </h1>
            <h1
              className="text-5xl font-bold text-white  mb-4"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              Get in touch today
            </h1>
            <p
              className="text-white opacity-70 py-5 text-sm"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              We are here to assist you with any inquiries or concerns you may
              have. Whether you need help with your reservation, have questions
              about our services, or simply want to share your feedback, our
              dedicated team is ready to help.
            </p>
            <ul
              className="list-item space-y-6 pt-8"
              data-aos="fade-up"
              data-aos-delay="800"
            >
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
