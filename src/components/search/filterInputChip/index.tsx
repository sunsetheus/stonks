"use client"

import { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlineCheck } from "react-icons/hi";

interface FilterInputChipProps {
    children: React.ReactNode
    value: string
    chipValue: string[]
    filter: "type" | "category" | "month" | "year"
    handleFilter: (value: string, filter: "type" | "category" | "month" | "year") => void
}

export const FilterInputChip: React.FC<FilterInputChipProps> = ({
    children,
    value, chipValue,
    filter, handleFilter
}) => {

    const handleClick = () => {
        setIsSpinning(true);
        handleFilter(value, filter);
        setTimeout(() => {
            setIsSpinning(false);
        }, 200);
    };

    const [isSpinning, setIsSpinning] = useState(false);

    return (
        <button
            className={`${(value != "all") && (!chipValue.includes("all")) && (chipValue.includes(value)) && 'bg-[#1a53a4] text-stonks-100'}
            ${(value != "all") && (chipValue.includes("all")) && 'bg-stonks-300 text-stonks-800'}
            ${(value != "all") && (!chipValue.includes("all")) && !chipValue.includes(value) && 'bg-stonks-300 text-stonks-800'}
            ${((value == "all") && (chipValue.includes("all"))) && 'bg-[#1a53a4] text-stonks-100'}
            ${((value == "all") && (!chipValue.includes("all"))) && 'bg-stonks-300 text-stonks-800'}
            transition-colors flex flex-row items-center px-3 py-1 rounded-2xl gap-1 text-[14px] md:text-[16px]`}
            onClick={() => handleClick()}
        >
            {chipValue.includes(value) ? (
                <HiOutlineCheck className={` ${isSpinning ? 'animate-spin-fast' : ''}`} />
            ) : (
                <HiOutlinePlusSm className={` ${isSpinning ? 'animate-spin-fast' : ''}`} />
            )}
            {children}
        </button>
    )
}