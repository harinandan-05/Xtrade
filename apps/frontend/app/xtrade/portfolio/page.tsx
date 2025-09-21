"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [Balance, SetBalance] = useState("");
  const [portfolio, setPortfolio] = useState<{ symbol: string; quantity: number }[]>([]);

  async function Getbalance() {
    axios.defaults.withCredentials = true;
    const res = await axios.get("http://localhost:3001/api/v1/balance");
    const data = res.data;
    const balance = parseFloat(data.balance).toFixed(2);
    SetBalance(balance);
  }

  async function Getportfolio() {
    axios.defaults.withCredentials = true;
    const res = await axios.get("http://localhost:3001/api/v1/portfolio");
    const data = res.data;

    if (data.Data) {
      setPortfolio(data.Data);
    }
  }

  useEffect(() => {
    Getportfolio();
    Getbalance();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center pt-16 space-y-8">
      {/* Balance Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">X Trade</span>
        </div>
        <div className="mt-4">
          <p className="text-gray-300 text-sm">Total Balance</p>
          <h1 className="text-4xl font-bold text-green-400">{Balance}</h1>
        </div>
      </div>

      {/* Holdings Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Holdings</h2>
        <div className="space-y-2">
          {portfolio.length > 0 ? (
            portfolio.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-800 p-3 rounded-lg"
              >
                <span className="font-medium">{item.symbol}</span>
                <span className="text-green-400">{item.quantity}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">No holdings yet...</div>
          )}
        </div>
      </div>

      {/* Transactions Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <div className="text-gray-400 italic">No transactions yet...</div>
        <button
          onClick={Getportfolio}
          className="mt-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
