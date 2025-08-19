import Hero from "@/components/Hero";
import Main from "@/components/Main";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-16">
        <div className="text-center text-white">
          <h1
            className="text-4xl font-bold uppercase"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Room & Rates
          </h1>
          <p className="py-3" data-aos="fade-down" data-aos-delay="200">
            Choose the best room that suits your needs and budget.
          </p>
        </div>
        <Main />
      </div>
    </>
  );
}
