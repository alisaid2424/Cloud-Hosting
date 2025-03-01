import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <section className="container absolute inset-0 flex items-center justify-center">
      <div className=" bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 capitalize">
          create new account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
