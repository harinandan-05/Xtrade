"use client";

import { useEffect, useRef } from "react";
import { BaselineSeries, createChart } from "lightweight-charts";
import { UTCTimestamp } from "lightweight-charts";

export default function ChartSection() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }
    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    };
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#111827" },
        textColor: "#66BB6A",
      },
      grid: {
        vertLines: { color: "#333" },
        horzLines: { color: "#333" },
      },
    });

    const baselineSeries = chart.addSeries(BaselineSeries,{
        baseValue: { type: "price", price: 25 },
      topLineColor: "rgba(38, 166, 154, 1)",
      topFillColor1: "rgba(38, 166, 154, 0.28)",
      topFillColor2: "rgba(38, 166, 154, 0.05)",
      bottomLineColor: "rgba(239, 83, 80, 1)",
      bottomFillColor1: "rgba(239, 83, 80, 0.05)",
      bottomFillColor2: "rgba(239, 83, 80, 0.28)",
    })
    baselineSeries.setData([
  { value: 1, time: 1642425322 as UTCTimestamp },
  { value: 8, time: 1642511722 as UTCTimestamp },
  { value: 10, time: 1642598122 as UTCTimestamp },
  { value: 20, time: 1642684522 as UTCTimestamp },
  { value: 3, time: 1642770922 as UTCTimestamp },
  { value: 43, time: 1642857322 as UTCTimestamp },
  { value: 41, time: 1642943722 as UTCTimestamp },
  { value: 43, time: 1643030122 as UTCTimestamp },
  { value: 56, time: 1643116522 as UTCTimestamp },
  { value: 46, time: 1643202922 as UTCTimestamp },
]);
    chart.timeScale().fitContent();
    return () => chart.remove();
  }, []);
  return (
    <div
      ref={chartContainerRef}
      className="w-full h-[400px] rounded-2xl bg-gray-900"
    ></div>
  );
}
