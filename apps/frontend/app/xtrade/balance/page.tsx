"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
  const [balance, setbalance] = useState<string | null>(null);

  async function Getbalance() {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.get("http://localhost:3001/api/v1/balance");
      const data = response.data
      const balance = parseFloat(data.balance).toFixed(2)
      setbalance(balance);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Getbalance();

  }, []);

  return (
    <div className="bg-black text-white min-h-screen min-w-screen flex flex-col items-center pt-20 space-y-10">
      <div className="bg-gray-900 w-[500px] h-40 rounded-2xl shadow-lg font-semibold text-4xl flex flex-col justify-center px-10">
        <h1 className="text-gray-300 text-lg font-medium mb-2">
          Balance Amount
        </h1>
        <div className="text-green-400 font-mono text-3xl">
          ${balance}
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
