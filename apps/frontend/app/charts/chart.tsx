"use client";

import { useEffect, useRef } from "react";
import { createChart, BaselineSeries } from "lightweight-charts";
import { UTCTimestamp } from "lightweight-charts";

export default function ChartSection({ data }: any) {
  const ChartRef = useRef<HTMLDivElement | any>('')
  const baslineRef = useRef<HTMLDivElement | any>('')
  useEffect(() =>{
    const chart = createChart(ChartRef.current,{
       width: ChartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#111827" },
        textColor: "#66BB6A",
      },
      grid: {
        vertLines: { color: "#333" },
        horzLines: { color: "#333" },
      },
    })

    const baselineSeries = chart.addSeries(BaselineSeries,{
       baseValue: { type: "price", price: 25 },
      topLineColor: "rgba(38, 166, 154, 1)",
      topFillColor1: "rgba(38, 166, 154, 0.28)",
      topFillColor2: "rgba(38, 166, 154, 0.05)",
      bottomLineColor: "rgba(239, 83, 80, 1)",
      bottomFillColor1: "rgba(239, 83, 80, 0.05)",
      bottomFillColor2: "rgba(239, 83, 80, 0.28)",
    })
    baslineRef.current = baselineSeries

    chart.timeScale().fitContent();

    return () => chart.remove();
  },[])


  useEffect(() =>{
    if(!data){
      return 
    }

    if(data.time && data.value){
      baslineRef.current.update({
        value:data.value,
        time:Math.floor(new Date(data.time).getTime() / 1000) as UTCTimestamp
      })
    }

  },[data])

  return (
    <div ref={ChartRef}className="w-full h-[400px] bg-gray-900">
    </div>
  )
}
