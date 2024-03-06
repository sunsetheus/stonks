"use client"

import { useDisclosure } from "react-use-disclosure";
import { ModalForm } from "../modalForm";
import { HiPlus } from "react-icons/hi";
import { createContext, useEffect, useState } from "react";
import { TypeNavbar } from "../navigation/typeNavbar";
import type { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { DisplayRecent } from "../display/displayRecent";

// interface TransactionProps {

// }

export const NavbarContext = createContext<{
    navbarValue: string
    setNavbarValue: (value: string) => void
  }>({
    navbarValue: '',
    setNavbarValue: () => {},
  })

interface RecentActivitySectionProps {
    data: Transaction[]
}

interface GroupedRecentTransactionsProps {
    date: string,
    transactions: Transaction[]
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
    data
}) => {
    const { isOpen, open, close } = useDisclosure(false);

    const [groupedRecentTransactions, setGroupedRecentTransactions] = useState<GroupedRecentTransactionsProps[]>([]);

    const [navbarValue, setNavbarValue] = useState<string>('all');

    useEffect(() => {
        const sortedTransactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

        const groupedSortedTransactions = new Map();
        sortedTransactions.forEach(transaction => {
            const transactionDate = format(new Date(transaction.date), 'dd MMMM yyyy');
            if (!groupedSortedTransactions.has(transactionDate)){
                groupedSortedTransactions.set(transactionDate, []);
            }
            groupedSortedTransactions.get(transactionDate).push(transaction);
        })

        const groupedRecentTransactionsArray = Array.from(groupedSortedTransactions, ([date, transactions]) => ({ date, transactions }));
        setGroupedRecentTransactions(groupedRecentTransactionsArray);
    }, [data]);

    // console.log(groupedRecentTransactions);
    
    return (
        <div className="flex flex-col gap-[40px]">
            <ModalForm
                isOpen={isOpen}
                onClose={close}
            />

            <section className="flex flex-col gap-[10px]">
                <div className="flex flex-col">
                    <text className="text-xl md:text-2xl font-semibold">Recent Activity</text>
                    <text className="text-[12px] md:text-[14px]">Showing the 10 most recent transactions</text>
                </div>

                <NavbarContext.Provider value={{ navbarValue: navbarValue, setNavbarValue: setNavbarValue }}>
                    <div className="flex flex-col gap-3 md:gap-[15px]">
                        <section className="flex flex-row justify-between">
                            <TypeNavbar />

                            <div className="flex items-center">
                                <button className="flex h-[30px] md:h-[35px] w-[30px] md:w-[35px] text-[20px] md:text-[25px] bg-[#1a53a4] p-2 rounded-md text-white items-center justify-center" onClick={open}>
                                    <HiPlus />
                                </button>
                            </div>
                        </section>

                        <section className="flex flex-col gap-5">
                            {groupedRecentTransactions.map((groupedRecentTransaction, key) => (
                                groupedRecentTransaction.transactions.some(transaction => navbarValue === 'all' || transaction.type === navbarValue) && (
                                    <div key={key} className="flex flex-col">
                                        <text className="text-[11px] md:text-[13px] text-stonks-600">{groupedRecentTransaction.date}</text>

                                        <div className="flex flex-col">
                                            {groupedRecentTransaction.transactions.filter(transaction => navbarValue === 'all' || transaction.type === navbarValue).map((transaction, key) => (
                                                <DisplayRecent 
                                                    key={key}
                                                    transaction={transaction}
                                                    type={transaction.type as "income" | "expense"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </section>
                    </div>
                </NavbarContext.Provider>
            </section>
        </div>
    )
}