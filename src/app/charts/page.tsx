"use client"

import { BarChart } from "@/components/charts/barChart";
import { LineChart, PieChart } from "@/components/charts";
import { GROUPED_EXPENSE_CATEGORY_DEFAULT_VALUE, GROUPED_INCOME_CATEGORY_DEFAULT_VALUE, GROUPED_NET_INCOME_DEFAULT_VALUE, GROUPED_TRANSACTION_DEFAULT_VALUE, YEAR_FILTER_OPTIONS } from "@/utils/contant";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChartDisplay } from "@/components/display";
import { Dropdown } from "@/components/dropdown";

interface BarChartProps {
    datas: {month: string, income: number, expense: number}[]
}

const ChartPage: React.FC = () => {
    const [data, setData] = useState<Transaction[]>([]);

    const router = useRouter();

    const [groupedTransactions, setGroupedTransactions] = useState<{month: string, income: number, expense: number}[]>(GROUPED_TRANSACTION_DEFAULT_VALUE);
    const [groupedNetIncome, setGroupedNetIncome] = useState<{ month: string; netIncome: number }[]>(GROUPED_NET_INCOME_DEFAULT_VALUE);
    const [groupedIncomeCategory, setGroupedIncomeCategory] = useState<{ category: string; money: number }[]>(GROUPED_INCOME_CATEGORY_DEFAULT_VALUE);
    const [groupedExpenseCategory, setGroupedExpenseCategory] = useState<{ category: string; money: number }[]>(GROUPED_EXPENSE_CATEGORY_DEFAULT_VALUE);
    
    const searchParams = useSearchParams();
    // const year = searchParams.get("year") ?? 2024;

    const [dropdownValue, setDropdownValue] = useState<string>(searchParams.get("year")?.toString() ?? "2024");


    const DISPLAY_LABEL = ['Most Income', 'Least Income', 'Most Expense', 'Least Expense']

    const getData = async() => {
        try {
            const queryString = new URLSearchParams(searchParams) ? `?${new URLSearchParams(searchParams)}` : `?year=${new Date().getFullYear()}`
            // console.log("haiiii", queryString)
            const res = await fetch(`/api/transactions${queryString}`, {
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

    const setChartData = (transactions: Transaction[]) => {
        const groupedTransactions: { month: string; income: number; expense: number }[] = [];
        const groupedNetIncome: { month: string; netIncome: number }[] = [];
        const groupedIncomeCategory: { category: string; money: number }[] = [];
        const groupedExpenseCategory: { category: string; money: number }[] = [];

        const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const INCOME_CATEGORY = ["allowance", "bonus", "salary", "other"];
        const EXPENSE_CATEGORY = ["education", "fashion", "food", "household", "transport", "other"];

        MONTHS.forEach(month => {
            groupedTransactions.push({ month, income: 0, expense: 0 });
            groupedNetIncome.push({ month, netIncome: 0 });
        });

        INCOME_CATEGORY.forEach(category => {
            groupedIncomeCategory.push({ category, money: 0});
        });

        EXPENSE_CATEGORY.forEach(category => {
            groupedExpenseCategory.push({ category, money: 0});
        });

        transactions.forEach(transaction => {
            const monthIndex = new Date(transaction.date).getMonth();
            const dataIndex = monthIndex;

            if (transaction.type === "income") {
                groupedTransactions[dataIndex].income += transaction.money;
                groupedNetIncome[dataIndex].netIncome += transaction.money;
                groupedIncomeCategory[INCOME_CATEGORY.indexOf(transaction.category)].money += transaction.money;
            } else {
                groupedTransactions[dataIndex].expense += transaction.money;
                groupedNetIncome[dataIndex].netIncome -= transaction.money;
                groupedExpenseCategory[EXPENSE_CATEGORY.indexOf(transaction.category)].money += transaction.money;
            }
        });

        setGroupedTransactions(groupedTransactions);
        setGroupedNetIncome(groupedNetIncome);
        setGroupedIncomeCategory(groupedIncomeCategory);
        setGroupedExpenseCategory(groupedExpenseCategory);
    }

    useEffect(() => {
        getData()
    }, [searchParams])

    useEffect(() => {
        setChartData(data)
    }, [data])

    useEffect(() => {
        router.push(`/charts?year=${dropdownValue}`)
    }, [dropdownValue])

    // console.log("ini data chart: ", data);
    // console.log("ini grouped data: ", groupedTransaction);

    return (
        <div className="flex flex-col min-h-screen px-[20px] md:px-[35px] lg:px-[50px] py-[40px] gap-[40px] w-full">
            <div className="flex flex-row justify-between">
                <text className="font-bold text-3xl">Chart</text>
                <Dropdown 
                    options={YEAR_FILTER_OPTIONS.slice(1, YEAR_FILTER_OPTIONS.length)}
                    dropdownValue={dropdownValue}
                    setDropdownValue={setDropdownValue}
                />
            </div>

            <div className="flex flex-col gap-5">
            <section className="flex flex-col h-full gap-5 p-3 lg:p-7 items-center bg-stonks-000 rounded-xl">
                    <text className="font-bold text-xl">Monthly Charts</text>

                    <div className="flex">
                        <BarChart datas={groupedTransactions}/>

                    </div>

            </section>

            <section className="flex flex-col md:flex-row w-full items-center md:justify-between h-full gap-5">
                <div className="flex w-full md:w-3/5 justify-center bg-stonks-000 rounded-xl p-3 lg:p-7">
                    <LineChart datas={groupedNetIncome}/>

                </div>

                <div className="flex w-full flex-col items-center font-semibold md:w-2/5 justify-center bg-stonks-000 rounded-xl p-3 lg:p-7">
                    <text>Income Data</text>
                    <PieChart datas={groupedIncomeCategory}/>
                </div>

            </section>

            </div>

            
        </div>
    )
}

export default ChartPage;