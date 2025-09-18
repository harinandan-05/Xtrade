
"use client"
export default function Homepage() {
  return (
    <div className="bg-black min-h-screen flex flex-col text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-extrabold text-green-400 tracking-wide">
          Xtrade
        </h1>
        <div className="space-x-8">
          <a href="#" className="hover:text-green-400 transition">Features</a>
          <a href="#" className="hover:text-green-400 transition">Pricing</a>
          <a href="#" className="hover:text-green-400 transition">Docs</a>
        </div>
        <button className="bg-green-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-green-500 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 relative overflow-hidden">
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]"></div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 relative z-10">
          Trade Smarter <span className="text-green-400">with Xtrade</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-10 relative z-10">
          A modern trading platform built for speed, precision, and a sleek
          minimal design. Stay on top of the market, anytime, anywhere.
        </p>
        <div className="flex space-x-4 relative z-10">
          <button className="bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition">
            Start Trading
          </button>
          <button className="bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-lg hover:border-green-400 hover:text-green-400 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} Xtrade. All rights reserved.
      </footer>
    </div>
  );
}
