"use client"

import { usePathname, useRouter } from "next/navigation";

export const Topbar = () => {
    const router = useRouter();
    const pathname = usePathname()

    const SIDEBAR_MAIN_MENU = [
        { text: "Home", route: "/" },
        { text: "My Wallet", route: "/wallet" },
        { text: "Charts", route: "/charts" },
    ];


    return (
        <div className="flex md:hidden flex-row fixed bg-[#00001d] w-screen px-5 xs:px-7 py-3 items-center text-[20px] justify-end xs:justify-between z-[999]">
            <text className="text-stonks-000 select-none hidden xs:flex">Stonks</text>

            <div className="flex flex-row gap-4 xs:gap-3">
                {SIDEBAR_MAIN_MENU.map((menu, key) => (
                    <div className="flex flex-col bg-[#00001d] select-none" key={key}>
                        <div className={`${pathname == menu.route ? 'text-[#7698c8] font-semibold' : 'text-stonks-000'} text-[14px] flex px-1 py-1 cursor-pointer`} onClick={() => {router.push(menu.route)}}>
                            {menu.text}
                        </div>

                        {pathname == menu.route && <div className="h-[2px] bg-[#7698c8] rounded-md"></div>}
                </div>
                ))}
            </div>
        </div>
    )
}