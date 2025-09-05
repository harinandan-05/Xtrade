export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-300">
      <div className="bg-amber-50 rounded-2xl shadow-lg w-full max-w-md p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-mono text-center text-gray-800">
          Signup to Xtrade
        </h1>
        <div className=" flex gap-10 w-30 pl-20 pt-3 h-10">
        <img src="https://cdn.pixabay.com/photo/2022/02/28/18/16/arrow-7039794_1280.jpg"></img>
        <img src="https://cdn.pixabay.com/photo/2022/02/28/18/16/arrow-7039795_1280.jpg"></img>
        </div>
        
        
        {/* Inputs */}
        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter username"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition">
          Signup
        </button>
      </div>
    </div>
  );
}
