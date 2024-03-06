"use client"

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { HiOutlineHome, HiOutlineCash, HiOutlineChartBar } from "react-icons/hi";
import "./style.css"
import { useOutsideClick } from "@/hooks/useOutsideClick";

const SIDEBAR_MAIN_MENU = [
  { icon: <HiOutlineHome />, text: "Home", route: "/" },
  { icon: <HiOutlineCash />, text: "My Wallet", route: "/wallet" },
  { icon: <HiOutlineChartBar />, text: "Charts", route: "/charts" },
];

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname()
  const ref = useOutsideClick(() => setIsExpanded(false))

  return (
    <div className={`hidden md:flex flex-col ${isExpanded ? 'block w-[230px]' : 'w-[65px]'} bg-[#00001d] text-stonks-100 px-3 py-6 gap-[20px] duration-300 ease-in-out`} id="bar-fixed" ref={ref}>
      
      <div className={`${isExpanded ? "" : "transform rotate-[360deg]"} text-[30px]  transition-transform duration-500 ease-in-out w-[30px] mx-[5px] justify-center cursor-pointer hidden md:flex`} onClick={() => setIsExpanded(!isExpanded)}>
        <HiMenu />
      </div>

      <div className={`bg-stonks-400 h-[2px]`}>
        <hr/>
      </div>

      <div className="flex flex-col gap-[8px]">
        {SIDEBAR_MAIN_MENU.map((menu, index) => (
          <div key={index} className={`${(!isExpanded && pathname == menu.route) ? "bg-[#1a53a4] gap-4 hover:" : isExpanded ? "hover:bg-[#1a53a4] gap-[8px]" : "hover:bg-[#000043] gap-4"} group transition-colors flex flex-row text-[16px] items-center cursor-pointer px-2 py-2 rounded-lg`} onClick={() => {router.push(menu.route), setIsExpanded(false)}}>
            <div className="flex flex-row gap-[12px]">
              <text className={`flex text-[26px]`}>{menu.icon}</text>
              {/* debuged it for hours and gave up, so i just made 2 text instead */}
              {/* <text className={`${isExpanded ? "text-[14px]" : "transition-transform delay-500 bg-stonks-900 px-2 py-1 rounded-sm text-[11px] absolute left-[55px] invisible group-hover:visible opacity-0 translate-x-20 overflow-hidden"} whitespace-pre duration-500`}>{menu.text}</text> */}
              <text className={`${isExpanded ? "text-[17px]" : "absolute transition-transform delay-500 opacity-0 translate-x-28 overflow-hidden pointer-events-none"} whitespace-pre duration-500`} style={{transitionDelay: `${index + 3}00ms`}}>{menu.text}</text>
            </div>
            
            <div className={`${isExpanded ? "hidden" : "absolute transition-transform delay-500 bg-stonks-900 px-2 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible"} whitespace-nowrap duration-500`}>{menu.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
