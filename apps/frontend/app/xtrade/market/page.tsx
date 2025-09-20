"use client";
import { useRef, useState } from "react";
import axios from "axios";

export default function Market() {
  const inputRef = useRef<HTMLInputElement | any>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function MarketData() {
    if (!inputRef.current.value) return;
    try {
      setLoading(true);
      axios.defaults.withCredentials = true
      const response = await axios.post("http://localhost:3001/api/v1/market", {
        Symbol: inputRef.current.value,
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Search Bar */}
      <div className="flex flex-row justify-center mt-6">
        <div className="bg-gray-900 w-[500px] rounded-lg h-12 flex flex-row items-center px-2">
          <input
            ref={inputRef}
            placeholder="Enter Stock Symbol (e.g. AAPL)"
            className="bg-gray-700 rounded-md text-white focus:outline-none h-8 px-3 w-full"
          />
          <button
            onClick={MarketData}
            className="bg-green-600 hover:bg-green-500 font-bold rounded-md px-4 h-8 ml-3 text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Market Feed Section */}
      <div className="flex justify-center mt-6">
        <div className="bg-gray-900 w-[500px] rounded-lg p-6 shadow-lg">
          {loading ? (
            <p className="text-gray-400">Fetching market data...</p>
          ) : data ? (
            <div className="flex flex-col space-y-3">
              <h2 className="text-2xl font-bold text-green-400">{data.symbol}</h2>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Price</span>
                <span className="font-bold text-lg">${data.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Opening Price</span>
                <span>${data.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Closing Price</span>
                <span>${data.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Change</span>
                <span
                  className={`font-bold ${
                    data.open - data.close >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {data.open - data.change >= 0 ? "▲" : "▼"} {data.change}%
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Search for a stock to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}
