import { GetUserById } from "@/apiCalls/UserApiCall";
import { User } from "@prisma/client";
import EditUserForm from "./EditUserForm";

interface EditProfilePageProps {
  params: { id: string };
}

const EditProfilePage = async ({ params }: EditProfilePageProps) => {
  const user: User = await GetUserById(params.id);

  return (
    <div className="h-full md:w-2/4 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-green-700 font-semibold mb-4">
          Edit User
        </h2>
        <EditUserForm user={user} />
      </div>
    </div>
  );
};

export default EditProfilePage;
