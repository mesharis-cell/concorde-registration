import React from "react";
import { bodyFontRegular } from "@/fonts";

interface DividerProps {
  text: string;
}

function Divider({ text }: DividerProps) {
  return (
    <div className="flex w-full items-center">
      <div className="h-px flex-grow bg-gray-300"></div>
      <span
        className={`mx-4 text-lg font-medium text-[#FFFFFF] sm:mx-6 ${bodyFontRegular.className}`}
      >
        {text}
      </span>
      <div className="h-px flex-grow bg-gray-300"></div>
    </div>
  );
}

export default Divider;
