"use client"

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { DropdownProps } from "@/types/interfaces"
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export const CategoryInput: React.FC<DropdownProps> = ({
    dropdownValue, setDropdownValue, options, type
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    const getDisplay = (value: string) => {
        const option = options.find((option) => option.value == value)
        return option ? option.display : null
    }

    const getIcon = (value: string) => {
        const option = options.find((option) => option.value == value)
        return option ? option.icon : null
    }

    useEffect(() => {
        setIsOpen(false)
    }, [type])

    return (
        <div className='border-[2px] rounded-md border-stonks-800 relative' ref={ref}>
            <div className="flex flex-row items-center justify-between px-3 py-[6px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className={`${getDisplay(dropdownValue) == null && "text-stonks-300"} text-[16px] font-light`}>
                    {getDisplay(dropdownValue) == null ? `${type.charAt(0).toUpperCase() + type.slice(1, type.length)}` : 
                    <text className="flex flex-row gap-2 items-center">
                        {getIcon(dropdownValue)} 
                        {getDisplay(dropdownValue)}
                    </text>}
                </div>

                <div className={`transform ${isOpen ? 'rotate-180' : ''}  transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown />
                </div>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} flex-col absolute top-[105%] w-full items-center overflow-y-auto max-h-[130px] rounded-b-md transition-all duration-300`}>
                {options.map(({display, value, icon}, key) => (
                    <div key={key} className="flex flex-col w-full text-[15px]">
                        <div className={`${value != dropdownValue ? "block" : "hidden"} flex flex-row cursor-pointer bg-white hover:bg-stonks-100 gap-2 px-3 py-2 items-center font-medium`} onClick={() => {setDropdownValue(value), setIsOpen(false)}}>
                            {icon}
                            {display}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}