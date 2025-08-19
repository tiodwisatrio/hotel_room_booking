import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-[var(--background)] px-8">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="mb-10 block">
              <Image
                src="/elysian_logo.png"
                width={128}
                height={128}
                alt="Logo"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Elysian Hotel - Your comfort is our priority. Experience luxury
              and relaxation like never before at Elysian Hotel, where every
              detail is designed to make your stay unforgettable.
            </p>
          </div>
          <div className="flex gap-20">
            <div className="flex-1 md:flex-none">
              <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
              <ul className="list-item space-y-5 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-[var(--gold)]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[var(--gold)]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/room" className="hover:text-[var(--gold)]">
                    Room
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[var(--gold)]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1 md:flex-none">
              <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
              <ul className="list-item space-y-5 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-[var(--gold)]">
                    Legal
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="hover:text-[var(--gold)]">
                    Term & Condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[var(--gold)]">
                    Payment Method
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[var(--gold)]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter to get the latest updates and offers
              directly in your inbox.
            </p>
            <form action="" className="mt-5">
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-sm bg-white p-4 text-gray-600 shadow-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="input email"
                />
              </div>
              <button className="bg-[var(--gold)] p-3 font-bold text-white w-full text-center rounded-sm hover:bg-[var(--goldhover)] ">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
        &copy; Copyright 2025 | Tio Dwi Satrio | All Right Reserved
      </div>

      {/* Create */}
    </footer>
  );
};

export default Footer;
