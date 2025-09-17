"use client"
import { useRef, useState } from "react"
import axios from 'axios'

export default function Market(){
    const inputRef = useRef<HTMLInputElement | any>('')
    const [data,setData] = useState('')

    async function MarketData(){
        if(!inputRef.current.value){return}
        const response = await axios.post("http://localhost:3001/api/v1/market",{
            Symbol:inputRef.current.value
        })
        setData(response.data)
    }

     return (
    <div>
      <div>
        market data
        <input ref={inputRef} type="text" />
        <button onClick={MarketData}>Fetch</button>
      </div>    
      <div className="bg-black text-white w-60 h-20 p-2">
        {data ? JSON.stringify(data) : "No data yet"}
      </div>
    </div>
  )
}
