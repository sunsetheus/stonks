"use client"

import React, { useRef } from 'react';
import { HiSearch } from 'react-icons/hi';

interface SearchBarProps {
    handleSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    handleSearch
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="flex items-center border-[#000033] border-[2px] rounded-lg p-2 w-full">
            <HiSearch className="text-[#000033] cursor-pointer" onClick={handleClick} size={18}/>
            <input 
                ref={inputRef}
                type="text"
                placeholder="Search your transactions" 
                className="ml-2 outline-none border-none flex-grow bg-inherit text-[16px] md:text-[18px]"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};
