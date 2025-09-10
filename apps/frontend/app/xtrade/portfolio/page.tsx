"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(5849.05);
  const [returnPercent, setReturnPercent] = useState(110.28);
  const [holdings, setHoldings] = useState([
    { symbol: "AAPL", name: "Apple Inc", shares: 10, price: 2324.7, change: +2.25, changePercent: 0.097 },
    { symbol: "META", name: "Meta Platforms Inc", shares: 5, price: 3524.35, change: -91.98, changePercent: -2.6 },
  ]);


  async function Getbalance() {
    try {
      const res = await fetch("/api/v1/balance");
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  }

  useEffect(() => {
    const interval = setInterval(Getbalance, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center pt-16 space-y-8">
      
      {/* Balance Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">X Trade</span>
          <span className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="mt-4">
          <p className="text-gray-300 text-sm">Total Balance</p>
          <h1 className="text-4xl font-bold text-green-400">
            ₹ {balance.toLocaleString()}
          </h1>
          <p className="text-green-500 text-sm mt-1">
            ↑ {returnPercent}% Return
          </p>
        </div>
      </div>

      {/* Holdings Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Holdings</h2>
        <div className="space-y-4">
          {holdings.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center border-b border-gray-800 pb-2">
              <div>
                <span className="bg-gray-700 px-2 py-1 rounded-md text-sm font-bold mr-2">
                  {stock.symbol}
                </span>
                <span className="text-gray-300">{stock.name}</span>
                <p className="text-gray-500 text-sm">{stock.shares} shares</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">
                  ₹ {stock.price.toLocaleString()}
                </p>
                <p className={stock.change >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                  {stock.change >= 0 ? `+₹${stock.change} (${stock.changePercent}%)` : `-₹${Math.abs(stock.change)} (${stock.changePercent}%)`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Card */}
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <div className="text-gray-400 italic">No transactions yet...</div>
      </div>
    </div>
  );
}
