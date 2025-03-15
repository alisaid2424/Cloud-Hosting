import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import route from "@/utils/route";

const AdminSidebar = () => {
  return (
    <>
      <Link
        href={route.admin}
        className="flex items-center justify-center lg:justify-start text-lg lg:text-2xl font-semibold"
      >
        <CgMenuGridR className="text-3xl me-1" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>

      <ul className="mt-10 flex items-center flex-col ">
        <Link className="sidbarLink" href={route.articlesTable}>
          <MdOutlineArticle className="me-1" />
          <span className="hidden lg:block">Articles</span>
        </Link>
        <Link className="sidbarLink" href={route.commentsTable}>
          <FaRegComments className="me-1" />
          <span className="hidden lg:block">Comments</span>
        </Link>
      </ul>
    </>
  );
};

export default AdminSidebar;
