import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <section className="container absolute inset-0 flex items-center justify-center">
      <div className=" bg-white rounded-lg p-5 w-full md:w-2/3 lg:w-2/4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 text-center">
          Welcome Back
        </h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
