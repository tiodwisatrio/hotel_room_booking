import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import { Suspense } from "react";
import { Metadata } from "next";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";

export const metadata: Metadata = {
  title: "Rooms & Rates",
  description: "Choose your best room today",
};
const RoomPage = () => {
  return (
    <div>
      <div className=" gap-3 text-center pt-24 pb-8">
        <p
          data-aos="fade-down"
          data-aos-delay="200"
          className="text-sm uppercase text-[var(--gold)] mb-4"
        >
          ROOMS AND SUITES
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-2xl md:text-4xl font-semibold text-white"
        >
          Comfortable Rooms <br /> Just For You
        </h1>
      </div>

      <div className="mt-10 px-4">
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
