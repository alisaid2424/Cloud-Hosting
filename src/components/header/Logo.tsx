import route from "@/utils/route";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";

const Logo = () => {
  return (
    <Link
      href={route.home}
      className="flex items-center text-2xl font-bold text-fuchsia-500 uppercase"
    >
      Cloud
      <GrTechnology />
      Hosting
    </Link>
  );
};

export default Logo;
