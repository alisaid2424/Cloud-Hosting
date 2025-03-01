import WebHostingPlan from "@/components/home/WebHostingPlan";
import HeroSection from "@/components/home/hero";

const HomePage = () => {
  return (
    <section className="container">
      <HeroSection />
      <h2 className="text-center  text-xl sm:text-3xl mb-14 font-bold capitalize">
        * Choose Your Web Hosting Plan *
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-10 lg:mx-24">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
};

export default HomePage;
