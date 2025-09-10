export default function Signin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-md p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-mono text-center text-yellow-400">
          Signin to Xtrade
        </h1>
        <div className="text-yellow-400 pl-28">
            place to learn trade
        </div>
        
        
        {/* Inputs */}
        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-2 border rounded-lg focus:outline-none text-yellow-400 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 border rounded-lg focus:outline-none text-yellow-400 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Button */}
        <button className="mt-6 w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-black transition">
          Signin
        </button>
      </div>
    </div>
  );
}
