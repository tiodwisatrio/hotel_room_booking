import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden flex flex-row items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/hero_img_elysian.jpg"
          alt="Hero Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-full text-center px-6 w-full md:w-1/2 ">
        <h1
          className="text-4xl md:text-7xl font-semibold leading-tight mb-3 capitalize text-center"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Come Home To <br /> Your Dream💫
        </h1>
        <p
          className="text-base text-white mb-8 opacity-70 text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Sejak 2021, kami telah membantu lebih dari 500.000 orang dari semua
          usia menikmati pengalaman menginap terbaik di hotel kami. Bergabunglah
          dengan kami dan rasakan kenyamanan sejati.
        </p>
        <Link
          href="/room"
          className="bg-[var(--gold)] w-full p-3 font-bold text-white rounded-sm hover:bg-[var(--goldhover)] py-3 px-6 md:px-10 lg:font-semibold transition-transform duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
