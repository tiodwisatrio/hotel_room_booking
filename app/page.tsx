import Hero from "@/components/Hero";
import Main from "@/components/Main";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-16">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ut!
          </p>
        </div>
        <Main />
      </div>
    </>
  );
}
