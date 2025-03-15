import Image from "next/image";
import cloudHosting from "../../../public/cloud-hosting.png";

const AboutPage = () => {
  return (
    <section className="container flex items-center justify-between flex-col lg:flex-row min-h-[calc(100vh-150px)]">
      <div className="basis-[45%]">
        <h2 className="py-5 text-3xl font-bold">About This App</h2>
        <p className="text-base text-gray-600 leading-[1.7]">
          The best web hosting solution for your online success. Sed in
          consectetur dui, vel tristique metus. Sed gravida, nunc vel
          consectetur dictum, ligula nunc hendrerit dolor, non consectetur nunc
          nunc vel tortor. Sed euismod orci non velit fermentum, vel consectetur
          diam ultricies. Nulla facilisi. Proin vel nulla at velit sagittis
          tincidunt et vel nisi. Sed auctor, risus vel viverra faucibus, enim
          velit malesuada velit, non commodo velit velit vel ipsum. Donec ac
          ipsum id lectus consectetur, euismod dapibus mi consectetur. Nulla
          facilisi. Sed consectetur, dui in ultricies interdum, mi neque
          facilisis ipsum, at sodales mauris velit vel arcu. Donec faucibus,
          justo vel facilisis consectetur, arcu felis elementum ipsum, et
          consectetur lectus nisi in
        </p>
      </div>
      <div className="basis-[45%]">
        <Image
          src={cloudHosting}
          width={500}
          height={500}
          priority
          alt="CloudHosting"
          className="ms-auto"
        />
      </div>
    </section>
  );
};

export default AboutPage;
