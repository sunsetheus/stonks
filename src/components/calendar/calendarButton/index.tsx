"use client"

import { addMonths, isSameDay, isSameMonth, subMonths } from "date-fns"

interface CalendarButtonProps {
    date: Date //displayed date
    calendarDate: Date //current calendar date
    setCalendarDate: (date: Date) => void
    todayDate: Date //today date
    inputDate: Date //user input date
    onClick: (date: Date) => void
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({
    date, calendarDate, setCalendarDate, todayDate, inputDate,
    onClick
}) => {
    const handleClick = () => {
        if ((date.getMonth() - calendarDate.getMonth()) < 0 || (date.getMonth() - 11 == calendarDate.getMonth())){
            setCalendarDate(subMonths(calendarDate, 1));
            onClick(date)
        } else if ((date.getMonth() - calendarDate.getMonth()) > 0 || (date.getMonth() + 11 == calendarDate.getMonth())){
            setCalendarDate(addMonths(calendarDate, 1));
            onClick(date)
        } else {
            onClick(date)
        }
    }

    return (
        <div className={`
        ${!isSameMonth(new Date(date), new Date(calendarDate)) ? 'text-stonks-300 hover:bg-[#e6e6f2] border-transparent' : isSameDay(new Date(date), new Date(todayDate)) ? 'hover:bg-[#b3b3d9]' : "border-transparent hover:bg-[#b3b3d9]"}
        ${isSameDay(new Date(date), new Date(todayDate)) && 'border-[#00001d] border-[2px]'}
        ${isSameDay(new Date(date), new Date(inputDate)) && 'bg-[#00001d] text-stonks-000 hover:bg-[#00001d] border-[#00001d]'}
        flex items-center justify-center border-[2px] text-[14px] font-medium px-[3px] mx-[2px] py-[4px] my-[1px] rounded-full cursor-pointer`} onClick={handleClick}>
            {date.getDate()}
        </div>
    )
}