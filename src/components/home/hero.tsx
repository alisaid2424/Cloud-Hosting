import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";
import CloudImage from "../../../public/cloud-hosting.png";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-100px)] flex items-center justify-center md:justify-around flex-col md:flex-row pt-10 md:pt-0 ">
      <div className="left-section">
        <h1 className="text-2xl sm:text-[44px] text-black font-bold">
          Cloud Hosting
        </h1>
        <p className="text-base sm:text-xl mt-4">
          The best web hosting solution for your online success
        </p>

        <div className="services py-2 mt-4">
          <div>
            <TiTick /> Easy To Use Control Panel
          </div>
          <div>
            <TiTick /> Secure Hosting
          </div>
          <div>
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>

      <div className="right-section">
        <Image src={CloudImage} alt="cloud" width={500} height={500} priority />
      </div>
    </section>
  );
};

export default HeroSection;
