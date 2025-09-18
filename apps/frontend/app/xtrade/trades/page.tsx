export default function Balance(){
    return(
        <div>
            trades page
            <div className="bg-gray-900">
        market data
        <input ref={inputRef} type="text" />
        <button onClick={() => MarketData()}>Fetch</button>
      </div>    
      <div className="bg-black text-white w-60 h-20 p-2">
        {data ? JSON.stringify(data) : "No data yet"}
      </div>
        </div>
    )
}