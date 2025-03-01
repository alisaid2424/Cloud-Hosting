import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {
  return (
    <div className="card mb-14 text-center">
      <h3 className="text-3xl font-bold text-purple-900">Premium</h3>
      <p className="text-3xl font-bold text-gray-900 my-5">$4.99/mo</p>
      <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold block">
        10% OFF
      </span>
      <div className="mt-6">
        <h5 className="text-2xl font-semibold text-purple-700 mb-5">
          Top Features
        </h5>

        <div className="flex flex-col gap-3 ps-3">
          <div className="flex items-center text-green-700 ">
            <TiTick /> 100 Website
          </div>
          <div className="flex items-center text-green-700 ">
            <TiTick /> 100 GB SSD Storage
          </div>
          <div className="flex items-center text-green-700 ">
            <TiTick /> Weekly Backups
          </div>
          <div className="flex items-center text-green-700 ">
            <TiTick /> Unlimited Bandwidth
          </div>
          <div className="flex items-center text-green-700 ">
            <TiTick /> Free SLL
          </div>
          <div className="flex items-center text-green-700 ">
            <TiTick /> Free Email
          </div>
        </div>
      </div>
      <button className="mt-4 border-2 border-gray-900 text-gray-900 text-xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-900 transition w-full">
        BUY NOW
      </button>
    </div>
  );
};

export default WebHostingPlan;
