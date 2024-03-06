import type { Transaction } from "@prisma/client"
import { format, isSameMonth } from "date-fns"
import { useState } from "react"
import { CalendarSidebar } from "../calendarSidebar"

export interface CalendarDisplayProps {
    date: Date
    transactions: Transaction[]
    calendarDate: Date
    handleClick: (data: Omit<CalendarDisplayProps, 'calendarDate' | 'handleClick'>) => void
}

export const CalendarDisplay: React.FC<CalendarDisplayProps> = ({
    date, transactions, calendarDate, handleClick
}) => {

    return (
        <div className="flex flex-col border-[1px] min-h-[80px] lg:min-h-[110px] p-1 px-1 lg:px-3 cursor-pointer gap-1 hover:border-stonks-200 hover:border-[2px] hover:rounded-lg" onClick={() => handleClick({ date: date, transactions: transactions})}>
            <div className={`${!isSameMonth(new Date(date), new Date(calendarDate)) && 'text-stonks-300'} flex justify-center text-[12px] lg:text-[16px]`}>
                {format(date, 'dd')}
            </div>

            <div className="flex flex-col gap-[3px]">
                {transactions.slice(0, 2).map((transaction, index) => (
                    <div key={index} className={`${transaction.type == "income" ? 'bg-green-500' : `bg-red-500`} text-[14px] rounded-xl px-2`}>
                        <text className="hidden lg:flex">{transaction.name.length > 10 ? transaction.name.slice(0, 10) + '...' : transaction.name}</text>
                        <text className={`${transaction.type == "income" ? 'bg-green-500' : `bg-red-500`} rounded-full w-[2px] h-[8px] text-center flex lg:hidden`}></text>
                    </div>
                ))}
            </div>


        </div>
    )
}