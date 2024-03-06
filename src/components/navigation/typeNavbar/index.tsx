"use client"

import { useContext } from "react"
import { NavbarContext } from "../../recentActivitySection"

export const TypeNavbar: React.FC = () => {
    const { navbarValue, setNavbarValue } = useContext(NavbarContext)

    const NAVBAR_OPTIONS = [
        {
            display: 'All',
            value: 'all'
        },
        {
            display: 'Income',
            value: 'income'
        },
        {
            display: 'Expense',
            value: 'expense'
        }
    ]
    return (
        <div className="flex flex-row gap-[18px] md:gap-8 text-[16px] md:text-[18px]">
            {NAVBAR_OPTIONS.map(({ display, value}, key) => (
                <div className="flex flex-col" key={key}>
                    <div className={`${navbarValue == value && 'text-[#1a53a4] border-b-[2px] font-semibold'} flex px-1 py-1 cursor-pointer`} onClick={() => setNavbarValue(value)}>
                        {display}
                    </div>

                    {navbarValue == value && <div className="h-[2px] bg-[#1a53a4] rounded-md"></div>}
                </div>
            ))}
        </div>
    )
}