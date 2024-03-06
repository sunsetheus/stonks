"use client"

import { RecentActivitySection } from "@/components/recentActivitySection";
import { HiArrowSmUp } from "react-icons/hi";
import { HiArrowSmDown } from "react-icons/hi";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import type { Transaction } from "@prisma/client";
import { RupiahFormatter } from "@/utils/calendarUtils";

export default function Home() {
    const [data, setData] = useState<Transaction[]>([]);
    const [summarizedData, setSummarizedData] = useState<{ balance: number; income: number; expense: number }>({ balance: 0, income: 0, expense: 0 })

    const getData = async() => {
        try {
            const res = await fetch('/api/transactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const resData = await res.json();
            setData(resData);

        } catch (error: any) {

        }
    }

    const getSummary = (transactions: Transaction[]) => {
        const summary: { balance: number; income: number; expense: number } = { balance: 0, income: 0, expense: 0 }

        transactions.forEach(transaction => {
            if (transaction.type == "income"){
                summary.balance += transaction.money
                summary.income += transaction.money
            } else {
                summary.balance -= transaction.money
                summary.expense += transaction.money
            }
        })
        return summary;
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setSummarizedData(getSummary(data));
    }, [data])

    const toString = (amount: number) => {
        const numberToString = amount.toString();
        return numberToString;
    }

    // console.log(RupiahFormatter.format(summarizedData.income), "bener")

    return (
        <div className="flex flex-col min-h-screen px-[30px] lg:px-[50px] md:py-[40px] py-[50px] gap-[45px]">
            <div className="flex flex-col gap-[20px]">
                <header>
                    <h1 className="flex font-bold text-2xl md:text-3xl">Welcome Back William!</h1>
                    <text className="flex">How will you make today a stonks day?</text>
                </header>

                <section className="flex flex-col lg:flex-row gap-[15px] lg:gap-[30px] flex-wrap w-full">
                    <section className="relative flex flex-col rounded-xl px-5 py-3 min-h-[95px] lg:min-h-[140px] justify-center bg-[#1a53a4] text-stonks-000 overflow-hidden flex-grow">
                        <FaMoneyCheckDollar className="absolute text-8xl bottom-[-22px] right-[-18px] text-[#80a0cd] rotate-[-6deg] z-20" />
                        <FaMoneyCheckDollar className="absolute text-8xl bottom-[5px] right-[-10px] opacity-20 rotate-6 z-10" />
                        <h4 className="text-[12px] lg:text-[14px] font-light">Your total balance</h4>

                        <text className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bold z-[20] whitespace-normal">{RupiahFormatter.format(summarizedData.balance).length > 20  ? RupiahFormatter.format(summarizedData.balance) : toString(summarizedData.balance)}</text>
                    </section>

                    <section className="flex flex-row min-h-[120px] gap-[20px] justify-between">
                        <section className="flex flex-col flex-grow min-h-[80px] min-w-[140px] h-full w-full lg:w-[290px] bg-[#f9f9f9] rounded-xl p-3 lg:p-[16px] gap-[12px] justify-between">
                            <div className="flex">
                                <div className="flex bg-green-300 text-green-800 p-2 rounded-md text-[20px] lg:text-[27px]">
                                    <TbPigMoney />
                                </div>
                            </div>
                           
                            <div className="flex flex-col">
                                <text className="text-[8px] md:text-xs text-stonks-700">Total Income</text>
                                <text className="flex flex-row items-center text-green-800 text-[18px] lg:text-[22px] font-medium">
                                    <HiArrowSmUp />
                                    {RupiahFormatter.format(summarizedData.income).length > 20  ? <text>{RupiahFormatter.format(summarizedData.income)}</text>: toString(summarizedData.income)}
                                </text>
                            </div>
                        </section>

                        <section className="flex flex-col flex-grow flex-wrap min-h-[60px] min-w-[140px] h-full w-full lg:w-[290px] bg-[#f9f9f9] rounded-xl p-3 lg:p-[16px] gap-[12px] justify-between">
                            <div className="flex">
                                <div className="flex bg-red-300 text-red-800 p-2 rounded-md text-[20px] lg:text-[27px]">
                                    <MdOutlinePayments />
                                </div>
                            </div>
                           
                            <div className="flex flex-col">
                                <text className="text-[8px] md:text-xs text-stonks-700">Total Expense</text>
                                <text className="flex flex-row items-center text-red-800 text-[18px] lg:text-[22px] font-medium">
                                    <HiArrowSmDown />
                                    {RupiahFormatter.format(summarizedData.expense).length > 20  ? <text>{RupiahFormatter.format(summarizedData.expense)}</text>: toString(summarizedData.expense)}
                                </text>
                            </div>
                        </section>
                    </section>
                </section> 
            </div>
        
            <RecentActivitySection data={data}/>
        </div>
    )
}