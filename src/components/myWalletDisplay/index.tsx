"use client"

import { Transaction } from "@prisma/client";
import { useState } from "react";
import { Pagination } from "../pagination";
import { DisplayCard } from "../display/displayCard";
import { useSearchParams } from "next/navigation";

interface MyWalletDisplayProps {
    transactions: Transaction[]
    getData: () => void
}

export const MyWalletDisplay: React.FC<MyWalletDisplayProps> = ({
    transactions, getData
}) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page")?? '1'
    const perPage = searchParams.get("perPage")?? '5'

    

    const [curentPage, setCurentPage] = useState<number>(1);
    const [entriData, setEntriData] = useState<number>(5);
    let totalPages = Math.ceil(transactions?.length / entriData)
    if (totalPages === 0) {
        totalPages = totalPages + 1
    }

    const startIndex = (curentPage - 1) * entriData
    const endIndex = startIndex + entriData
    const displayedData = transactions.slice(startIndex, endIndex)

    return (
        <div className="flex flex-col gap-4">
            {transactions.map((transaction, key) => (
                <DisplayCard key={key} transaction={transaction} type={transaction.type as "income" | "expense"} getData={getData}/>

            ))}
            <section>

            </section>
                {/* <Pagination
                    curentPage={curentPage}
                    setCurentPage={setCurentPage}
                    entriData={entriData}
                    setEntriData={setEntriData}
                    totalPages={totalPages}
                /> */}
            
        </div>

    )
}