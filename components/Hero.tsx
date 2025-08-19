import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero_img_elysian.jpg"
          alt="Hero Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative flex flex-col justify-center items-start h-full text-center px-6 w-fit">
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-3 capitalize text-start">
          Come Home To <br /> Your Dream💫
        </h1>
        <p className="text-base text-white mb-8 opacity-70 text-start">
          <span className="block">
            Sejak 2021, kami telah membantu lebih dari 500.000 orang dari semua
            usia
          </span>
          <span className="block">
            menikmati pengalaman menginap terbaik di hotel kami.
          </span>
          <span className="block">
            Bergabunglah dengan kami dan rasakan kenyamanan sejati.
          </span>
        </p>
        <Link
          href="/room"
          className="bg-[var(--gold)] w-full p-3 font-bold text-white rounded-sm hover:bg-[var(--goldhover)] py-3 px-6 md:px-10 lg:font-semibold transition-transform duration-300"
        >
          Book Now
        </Link>
        {/* <Link
            href="/contact"
            className="bg-transparent border border-gray-100 p-3 font-bold text-white rounded-sm hover:bg-[var(--goldhover)] py-3 px-6 md:px-10 lg:font-semibold hover:scale-105 transition-transform duration-300"
          >
            Contact
          </Link> */}
      </div>
    </div>
  );
};

export default Hero;
