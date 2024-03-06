"use client"

import { Dropdown } from "@/components/dropdown"
import { generateDate } from "@/utils/calendarUtils";
import { CALENDAR_SIDEBAR_DEFAULT_VALUE, MONTH_FILTER_OPTIONS, YEAR_FILTER_OPTIONS } from "@/utils/contant"
import { addMonths, format, formatDate, subMonths } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CalendarSidebar } from "../calendarSidebar";
import { CalendarDisplay, CalendarDisplayProps } from "../calendarDisplay";
import { CalendarDropdown } from "../calendarDropdown";
import type { Transaction } from "@prisma/client";

interface CanlendarSectionProps {
    transactions: Transaction[]
    getData: () => void
}

interface GroupedRecentTransactionsProps {
    date: string,
    transactions: Transaction[]
}

export const CalendarSection: React.FC<CanlendarSectionProps> = ({
    transactions, getData
}) => {
    const MONTH_MAP: { [key: string]: number } = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    const router = useRouter();


    // console.log("ini transactions", transactions)


    const searchParams = useSearchParams();
    // const [calendarDate, setCalendarDate] = useState<Date>(new Date(parseInt(searchParams.get("year") ?? format(new Date(), 'yyyy')), searchParams.get("month") ?? format(new Date(), 'MMM').toLowerCase()))
    const [monthValue, setMonthValue] = useState<string>(searchParams.get("month") ?? format(new Date(), 'MMM').toLowerCase());
    const [yearValue, setYearValue] = useState<string>(searchParams.get("year") ?? format(new Date(), 'yyyy'));

    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // const calendarDate = new Date(MONTH_MAP[searchParams.get("month") ?? format(new Date(), 'MMM').toLowerCase()])

    // const monthParam = searchParams.get("month");
    const monthParam = searchParams.get("month") ? (searchParams.get("month")!.includes(',') ? searchParams.get("month")!.split(',')[0].trim() : searchParams.get("month")!.trim()) : format(new Date(), 'MMM').toLowerCase();
    const monthIndex = MONTH_MAP[monthParam];
    const yearParam = parseInt(searchParams.get("year") ?? format(new Date(), 'yyyy'), 10);
    const year = isNaN(yearParam) ? new Date().getFullYear() : yearParam;
    // const calendarDate = new Date(year, monthIndex, 1);

    const [calendarDate, setCalendarDate] = useState<Date>(new Date(year, monthIndex, 1));
    const dates: Date[] = generateDate(calendarDate.getMonth(), calendarDate.getFullYear());
    // console.log("ini dates", dates)

    const [groupedMonthlyTransactions, setGroupedMonthlyTransactions] = useState<GroupedRecentTransactionsProps[]>([]);
    const [sidebarTransaction, setSidebarTransaction] = useState<Omit<CalendarDisplayProps, 'calendarDate' | 'handleClick'>>(CALENDAR_SIDEBAR_DEFAULT_VALUE);


    // console.log("ini grouped", groupedMonthlyTransactions)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // useEffect(() => {
    //     const queryParams: string[] = [];

    //     queryParams.push(`month=${monthValue}`);
    //     queryParams.push(`year=${yearValue}`);

    //     const finalQueryString = `&${queryParams.join('&')}`;
    //     router.push(`/wallet?view=calendar${finalQueryString}`);

    // }, [monthValue, yearValue])

    useEffect(() => {
        const queryParams: string[] = [];

        queryParams.push(`month=${format(calendarDate, 'MMM').toLowerCase()}`);
        queryParams.push(`year=${calendarDate.getFullYear()}`);

        const finalQueryString = `&${queryParams.join('&')}`;
        router.push(`/wallet?view=calendar${finalQueryString}`);

    }, [calendarDate])

    useEffect(() => {
        const monthParam = searchParams.get("month") ? (searchParams.get("month")!.includes(',') ? searchParams.get("month")!.split(',')[0].trim() : searchParams.get("month")!.trim()) : format(new Date(), 'MMM').toLowerCase();
        const monthIndex = MONTH_MAP[monthParam];
        const yearParam = parseInt(searchParams.get("year") ?? format(new Date(), 'yyyy'), 10);
        const year = isNaN(yearParam) ? new Date().getFullYear() : yearParam;

        setCalendarDate(new Date(year, monthIndex, 1));
    }, [searchParams])

    useEffect(() => {
        const sortedTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        const groupedTransactions = new Map<string, Transaction[]>();

        dates.forEach(date => {
            const dateString = format(date, 'dd MMMM yyyy');
            groupedTransactions.set(dateString, []);
        });
    
        sortedTransactions.forEach(transaction => {
            const dateString = format(transaction.date, 'dd MMMM yyyy');
            const transactionsForDate = groupedTransactions.get(dateString);
            if (transactionsForDate) {
                transactionsForDate.push(transaction);
            }
        });
    
        const groupedRecentTransactionsArray = Array.from(groupedTransactions, ([date, transactions]) => ({ date, transactions }));
        setGroupedMonthlyTransactions(groupedRecentTransactionsArray);
    }, [transactions]);

    const handleSetMonth = (value: string) => {
        setMonthValue(value)

        const queryParams: string[] = [];
        queryParams.push(`month=${value}`);
        queryParams.push(`year=${searchParams.get('year')}`);

        const finalQueryString = `?${queryParams.join('&')}`;
        router.push(`/wallet${finalQueryString}`);
    }

    const handleSetYear = (value: string) => {
        setYearValue(value)

        const queryParams: string[] = [];
        queryParams.push(`month=${searchParams.get('month')}`);
        queryParams.push(`year=${value}`);

        const finalQueryString = `?${queryParams.join('&')}`;
        router.push(`/wallet${finalQueryString}`);
    }

    const handleCalendarSidebar = (data: Omit<CalendarDisplayProps, 'calendarDate' | 'handleClick'>) => {
        setSidebarTransaction(data);
        setIsOpen(!isOpen);
    }

    return (
        <div className="flex flex-col border-[1px] bg-stonks-000 border-stonks-200 rounded-2xl p-2 lg:p-7 gap-7">
            <section className="flex flex-row justify-between">
                <div className="flex flex- gap-5">
                    <CalendarDropdown
                        options={MONTH_FILTER_OPTIONS.slice(1, MONTH_FILTER_OPTIONS.length)}
                        dropdownValue={monthValue}
                        setDropdownValue={handleSetMonth}
                    />

                    <CalendarDropdown
                        options={YEAR_FILTER_OPTIONS.slice(1, YEAR_FILTER_OPTIONS.length)}
                        dropdownValue={yearValue}
                        setDropdownValue={handleSetYear}
                    />
                </div>

                <div className="flex">
                    <button className='p-[6px] hover:bg-stonks-100 rounded-full' onClick={() => setCalendarDate(subMonths(calendarDate, 1))}><HiOutlineChevronLeft size={20}/></button>
                    <button className='p-[6px] hover:bg-stonks-100 rounded-full' onClick={() => setCalendarDate(addMonths(calendarDate, 1))}><HiOutlineChevronRight size={20}/></button>
                </div>
            </section>
                    
            <section className="grid grid-cols-7">
                {DAYS.map((props, key) => (
                    <div key={key} className={`${key !== 0 ? 'text-meetly-800':'text-danger-100'} flex items-center justify-center font-semibold select-none text-[14px] lg:text-[16px] mb-3`}>
                        <text className="hidden lg:flex">{props}</text>
                        <text className="hidden md:flex lg:hidden">{props.slice(0, 3)}</text>
                        <text className="flex md:hidden">{props.slice(0, 1)}</text>
                    </div>
                ))}

                {groupedMonthlyTransactions.map((props, key) => (
                    <CalendarDisplay
                        key={key}
                        date={new Date(props.date)}
                        transactions={props.transactions}
                        calendarDate={calendarDate}
                        handleClick={handleCalendarSidebar}
                    />
                ))}
            </section>

            <CalendarSidebar isOpen={isOpen} setIsOpen={setIsOpen} data={sidebarTransaction} getData={getData}/>

        </div>
    )
}