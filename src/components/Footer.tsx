import React from "react";

const Footer = () => {
  return (
    <section className="flex items-center justify-center text-sm sm:text-base text-white bg-gray-700 h-[50px]">
      Copyright &copy; {new Date().getFullYear()} My Website. All rights
      reserved.
    </section>
  );
};

export default Footer;
