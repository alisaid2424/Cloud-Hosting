import AddArticlesForm from "./AddArticlesForm";

const AdminPage = () => {
  return (
    <div className="h-full flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full md:w-2/3 lg:w-3/4">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticlesForm />
      </div>
    </div>
  );
};

export default AdminPage;
