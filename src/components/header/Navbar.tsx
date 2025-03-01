"use client";
import Link from "next/link";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="flex items-center justify-between flex-1">
      <div>
        <Link
          href="/"
          className="md:flex items-center text-2xl font-bold text-fuchsia-500 uppercase hidden "
        >
          Cloud
          <GrTechnology />
          Hosting
        </Link>

        <div className="text-5xl cursor-pointer text-slate-800 md:hidden">
          {toggle ? (
            <IoCloseSharp onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <IoMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>

      <div
        className="navLinksWraper m-auto"
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className="navLinks relative z-50 flex items-start md:items-center flex-col md:flex-row ps-4 md:ps-0 pb-3 md:pb-0 gap-3 lg:gap-8">
          <Link onClick={() => setToggle(false)} href="/">
            Home
          </Link>
          <Link onClick={() => setToggle(false)} href="/about">
            About
          </Link>
          <Link onClick={() => setToggle(false)} href="/articles?pageNumber=1">
            Articles
          </Link>
          {isAdmin && (
            <Link onClick={() => setToggle(false)} href="/admin">
              Dashboard
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
