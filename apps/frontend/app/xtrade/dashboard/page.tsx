  "use client";
  import DropDown from "@/app/buttons/dropdown";
  import ChartSection from "@/app/charts/chart";
  import { useRouter } from "next/navigation";
  import { EventHandler, useEffect, useRef, useState } from "react";

  export default function Dashboard() {
    const router = useRouter();

    const [symbol, setSymbol] = useState("ETHUSDT");
    const [data,setData] = useState<any>()

    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
      const ws_URL = "ws://localhost:8080";
      const ws = new WebSocket(ws_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("socket opened")
        ws.send(JSON.stringify({ type: "subscribe", symbol }));
      };

      ws.addEventListener('message',function(ev){
        const msg = JSON.parse(ev.data)
        console.log(msg,"msg from websokcet")
        setData(msg)
      })

      return  () =>{
        ws.close()
        console.log("closing socket")
      }
    }, [symbol]);


    function HandleSubmit(newSymbol: string) {
      setSymbol(newSymbol);
      wsRef.current?.send(
        JSON.stringify({ type: "subscribe", symbol: newSymbol })
      );
    }

    console.log(data,"data to chart")

    return (
      <div className="bg-black min-h-screen flex text-white">
        {/* Sidebar */}
        <div className="bg-gray-900 min-h-screen w-56 flex flex-col items-center py-6 space-y-6 shadow-lg">
          <h1 className="text-green-400 font-bold text-2xl">Dashboard</h1>
          <button
            onClick={() => router.push("/")}
            className="w-40 py-2 rounded-md bg-green-500 hover:bg-green-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/xtrade/portfolio")}
            className="w-40 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Portfolio
          </button>
          <button
            onClick={() => router.push("/xtrade/balance")}
            className="w-40 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Balance
          </button>
          <button
            onClick={() => router.push("/xtrade/portfolio")}
            className="w-40 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Settings
          </button>
          <button onClick={() => router.push("")}></button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 p-6 space-y-6">
          {/* Charts Section */}
          <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <DropDown onselect={HandleSubmit} />
              <span className="text-sm text-gray-400">Live Chart</span>
            </div>
            <ChartSection data={data} />
          </div>

          {/* Buy/Sell Section */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col space-y-6">
            {/* Buttons */}
            <div className="flex justify-between">
              <button className="cursor-pointer w-40 py-2 bg-green-500 hover:bg-green-600 rounded-md text-xl font-bold transition">
                BUY
              </button>
              <button className="cursor-pointer w-40 py-2 bg-red-500 hover:bg-red-600 rounded-md text-xl font-bold transition">
                SELL
              </button>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Enter Quantity
                </label>
                <input
                  type="number"
                  placeholder="eg: 23"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Enter Symbol
                </label>
                <input
                  type="text"
                  placeholder="Eg : AAPL"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Enter Price
                </label>
                <input
                  type="number"
                  placeholder="eg: 243523"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 outline-none"
                />
              </div>
            </div>

            {/* Balance */}
            <div className="bg-gray-800 rounded-md py-3 px-4 text-green-400 text-xl font-bold text-center shadow-inner">
              Balance: $123,130,123
            </div>
          </div>
        </div>
      </div>
    );
  }
