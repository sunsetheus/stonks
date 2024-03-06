"use client"

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { generateDate } from "@/utils/calendarUtils";
import { addMonths, format, subMonths } from "date-fns";
import { useState } from "react";
import { HiChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CalendarButton } from "../calendarButton";

interface CalendarInputProps {
    input: Date
    setInput: (date: Date) => void
}

export const CalendarInput: React.FC<CalendarInputProps> = ({
    input, setInput
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    const [calendarDate, setCalendarDate] = useState<Date>(new Date()); //default input using today date
    const dates: Date[] = generateDate(calendarDate.getMonth(), calendarDate.getFullYear())

    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date();

    // const [inputDate, setInputDate] = useState<Date>(today);

    const handleCalendarInputClick = (date: Date) => {
        setInput(date);
        setIsOpen(false);
    }

    return (
        <div className={`${isOpen ? "border-b-0 rounded-b-none" : ""} bg- border-[2px] rounded-md border-stonks-800 relative flex flex-col items-center`} ref={ref}>
            <div className="flex flex-row justify-between items-center w-full px-3 py-[6px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="">
                    <text>{format(input, "dd MMMM yyyy")}</text>
                </div>

                <div className={`transform ${isOpen ? 'rotate-180' : ''}  transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown />
                </div>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} flex-col absolute w-[101%] top-[100%] bg-stonks-000 px-3 pb-2 border-[2px] rounded-b-md border-black gap-2 z-[1]`}>
                <section className="flex flex-row justify-between w-full items-center pt-2">
                    <div className="flex font-semibold gap-1 items-center text-[14px]">
                        <text>{format(calendarDate, 'MMMM')}</text>
                        <text>{format(calendarDate, 'yyyy')}</text>
                    </div>

                    <div className="flex gap-2">
                        <button className='p-[6px] hover:bg-stonks-100 rounded-full' onClick={() => setCalendarDate(subMonths(calendarDate, 1))}><HiOutlineChevronLeft size={18}/></button>
                        <button className='p-[6px] hover:bg-stonks-100 rounded-full' onClick={() => {setCalendarDate(addMonths(calendarDate, 1))}}><HiOutlineChevronRight size={18}/></button>
                    </div>
                </section>

                <section className='grid grid-cols-7'>
                    {DAYS.map((props, key) => (
                        <div key={key} className={`${key !== 0 ? 'text-meetly-800':'text-danger-100'} flex items-center justify-center font-semibold select-none text-[13px] mb-1`}>
                            {props}
                        </div>
                    ))}

                    {dates.map((props: Date, key) => (
                        <CalendarButton 
                            key={key}
                            date={props}
                            calendarDate={calendarDate}
                            setCalendarDate={setCalendarDate}
                            todayDate={today}
                            inputDate={input}
                            onClick={handleCalendarInputClick}
                        />
                    ))}
                </section>
            </div>
        </div>
    )
}