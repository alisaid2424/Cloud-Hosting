"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import route from "@/utils/route";
import { User } from "@prisma/client";
import AuthButton from "./AuthButton";
import Logo from "./Logo";

const Navbar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Home", href: route.home },
    { title: "About", href: route.about },
    { title: "Articles", href: route.articles },
  ];

  const isActive = (href: string) =>
    pathname.split("?")[0] === href.split("?")[0];

  return (
    <header className="sticky top-0 w-full z-50">
      <div
        className={`${pathname.startsWith(route.admin) ? "px-6" : "container max-w-7xl"}  flex items-center justify-between py-5`}
      >
        <Logo />

        <div
          className={`max-md:absolute max-md:top-0 max-md:start-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center gap-8 max-md:justify-center md:px-8 md:py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/90 md:bg-white/10 md:border md:border-gray-300/20 overflow-hidden ${
            isOpen ? "max-md:w-full" : "max-md:w-0"
          } transition-[width] duration-300`}
        >
          <MdClose
            className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white hover:rotate-180 hover:text-fuchsia-500 transition-all duration-300"
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => {
                scrollTo(0, 0);
                setIsOpen(false);
              }}
              className={`max-md:text-white hover:text-fuchsia-500 text-lg font-medium transition ${
                isActive(link.href) ? "!text-fuchsia-500 " : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link
              onClick={() => setIsOpen(false)}
              href={route.admin}
              className={`max-md:text-white hover:text-fuchsia-500 text-lg font-medium transition ${pathname.startsWith(route.admin) && "!text-fuchsia-500"}`}
            >
              Dashboard
            </Link>
          )}

          <div className="md:hidden">
            <AuthButton user={user} setIsOpen={setIsOpen} />
          </div>
        </div>

        <div className="max-md:hidden">
          <AuthButton user={user} setIsOpen={setIsOpen} />
        </div>

        <MdMenu
          onClick={() => setIsOpen((prev) => !prev)}
          className="max-md:ms-4 md:hidden w-8 h-8 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Navbar;
