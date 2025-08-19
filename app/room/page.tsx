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
      <div className=" gap-3 text-center pt-20 pb-8">
        <p
          data-aos="fade-down"
          className="text-sm uppercase text-[var(--gold)]"
        >
          ROOMS AND SUITES
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
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
