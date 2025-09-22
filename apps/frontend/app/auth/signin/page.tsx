"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Signin() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function authCheck() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/login",
        {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // ✅ use relative path inside push (Next.js will handle it)
        router.push("/xtrade/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  // ✅ JSX should be returned from the component itself, not inside authCheck
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-800">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center  text-green-400">
          Sign in to Xtrade
        </h1>
        <p className="text-center text-gray-400 mt-2">
          Minimal. Secure. Fast.
        </p>

        {/* Inputs */}
        <div className="mt-8 flex flex-col gap-4">
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            className="px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none text-white focus:ring-2 focus:ring-green-400"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
            className="px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none text-white focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={authCheck}
          className=" cursor-pointer mt-6 w-full bg-green-400 text-black font-semibold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Sign In
        </button>

        {/* Extra Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-green-400 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
