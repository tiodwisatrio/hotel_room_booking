import { Metadata } from "next";
import HeaderSection from "@/components/HeaderSection";
import Image from "next/image";
import { IoEyeOffOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "About",
  description: "Who We Are",
};

const AboutPage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto py-20 px-16 gap-x-16 gap-y-8">
        <div className="flex-1">
          <h1
            className="text-4xl font-semibold text-white mb-2 leading-tight"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            A Legacy of Hospitality
          </h1>
          <p
            className="text-white opacity-70 text-sm"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            With over 4 years of experience in the hospitality industry, we
            pride ourselves on delivering exceptional service and unforgettable
            experiences for our guests.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-10 ">
            <div
              className="border-t-1 py-2 border-gray-500"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="text-2xl font-semibold text-white mb-2">
                4+ years
              </h1>

              <p className="text-white opacity-70 text-[10px]">
                Experience in hotel booking and management systems.
              </p>
            </div>
            <div
              className="border-t-1 py-2 border-gray-500"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h1 className="text-2xl font-semibold text-white mb-2">
                100+ Rooms
              </h1>

              <p className="text-white opacity-70 text-[10px]">
                Experience in managing over 100 hotel rooms, ensuring optimal
                occupancy and guest satisfaction.
              </p>
            </div>
            <div
              className="border-t-1 py-2 border-gray-500"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h1 className="text-2xl font-semibold text-white mb-2">
                150+ Guests
              </h1>

              <p className="text-white opacity-70 text-xs">
                Experience in managing over 150 guests, ensuring their
                satisfaction and comfort throughout their stay.
              </p>
            </div>
            <div
              className="border-t-1 py-2 border-gray-500"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h1 className="text-2xl font-semibold text-white mb-2">
                99% Success
              </h1>
              <p className="text-white opacity-70 text-xs">
                Experience in maintaining a 99% satisfaction rate among guests,
                ensuring exceptional service and memorable stays.
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex-1 justify-items-end order-first md:order-last"
          data-aos="zoom-in-left"
          data-aos-delay="400"
        >
          <Image
            src="/receptionist.jpg"
            alt="Receptionist Image"
            width={600}
            height={500}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <Image
            src="/about-image.jpg"
            width={650}
            height={579}
            alt="about_image"
            className="rounded-xl"
            data-aos="zoom-in-right"
            data-aos-delay="500"
          />
          <div>
            <h1
              className="text-5xl font-semibold text-white mb-4"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Who We Are
            </h1>
            <p
              className="text-white opacity-70 py-5"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              We are a dedicated team of hospitality professionals with over 4
              years of experience in the industry. Our mission is to provide
              exceptional service and create unforgettable experiences for our
              guests. We believe in the power of hospitality to bring people
              together and create lasting memories.
            </p>

            <ul className="list-item space-y-6 pt-8 text-white">
              <li
                className="flex gap-5"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="flex-none mt-1">
                  <IoEyeOffOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-white opacity-70">
                    To be the leading hotel in the industry, renowned for our
                    exceptional service and commitment to guest satisfaction.
                  </p>
                </div>
              </li>

              <li
                className="flex gap-5"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="flex-none mt-1">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <p className="text-white opacity-70">
                    To provide exceptional service and create unforgettable
                    experiences for our guests.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
