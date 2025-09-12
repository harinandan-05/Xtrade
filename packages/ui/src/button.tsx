"use client";

import { ReactNode } from "react";

interface ButtonProps {
  input: string;
}

export default function PrButton({input}:ButtonProps){
  return(
    <button className="bg-amber-400 text-white">
    {input}
  </button>
  )
  
}