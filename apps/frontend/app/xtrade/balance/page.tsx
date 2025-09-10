"use client"

import { useEffect, useState } from "react";

export default function Balance() {
  const [balance, setbalance] = useState(null);

  async function Getbalance() {
    try {
      const response = await fetch("/api/v1/balance");
      const data = await response.json();
      setbalance(data.balance);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    Getbalance();

    const interval = setInterval(Getbalance, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen min-w-screen flex flex-col items-center pt-20 space-y-10">
      <div className="bg-gray-900 w-[500px] h-40 rounded-2xl shadow-lg font-semibold text-4xl flex flex-col justify-center px-10">
        <h1 className="text-gray-300 text-lg font-medium mb-2">
          Balance Amount
        </h1>
        <div className="text-yellow-400 font-mono text-3xl">
          ₹ 190088
        </div>
      </div>

      <div className="bg-gray-900 w-[500px] min-h-60 rounded-2xl shadow-lg px-10 py-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">
          Transactions
        </h1>
        <div className="text-gray-400 italic">
          No transactions yet...
        </div>
      </div>
    </div>
  );
}
