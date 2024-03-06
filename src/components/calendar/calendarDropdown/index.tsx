"use client"

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export interface OptionProps {
    display: string
    value: string
}

export interface DropdownProps {
    options: OptionProps[]
    dropdownValue: string
    setDropdownValue: (value: string) => void
}

export const CalendarDropdown: React.FC<DropdownProps> = ({
    dropdownValue, options, setDropdownValue
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    const getDisplay = (value: string) => {
        const option = options.find((option) => option.value == value)
        return option ? option.display : null
    }
    return (
        <div className={`${options[0].display == "2024" ? 'w-[90px]' : 'w-[120px] lg:w-[160px]'} border-[2px] rounded-md border-stonks-800 relative`} ref={ref}>
            <div className="flex flex-row items-center justify-between px-3 py-[6px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className={`${getDisplay(dropdownValue) == null && "text-stonks-300"} text-[12px] lg:text-[16px] font-light`}>
                    {getDisplay(dropdownValue) == null ? `Year` : 
                    <text className="flex flex-row gap-2 items-center">
                        {getDisplay(dropdownValue)}
                    </text>}
                </div>

                <div className={`transform ${isOpen ? 'rotate-180' : ''}  transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown />
                </div>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} flex-col absolute top-[105%] w-full items-center overflow-y-auto max-h-[130px] rounded-b-md transition-all duration-300`}>
                {options.map(({display, value}, key) => (
                    <div key={key} className="flex flex-col w-full text-[16px]">
                        <div className={`${value != dropdownValue ? "block" : "hidden"} flex flex-row cursor-pointer bg-white hover:bg-stonks-100 gap-2 px-3 py-2 items-center font-medium`} onClick={() => {setDropdownValue(value), setIsOpen(false)}}>
                            {display}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}