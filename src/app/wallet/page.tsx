"use client"

import type { Transaction } from "@prisma/client";
import { useEffect, useState } from "react";

import { HiOutlineCalendar } from "react-icons/hi";
import { GrList } from "react-icons/gr";
import { SearchBar, SearchFilter } from "@/components";
import { useDisclosure } from "react-use-disclosure";

import { HiOutlineAdjustments } from "react-icons/hi";
import { MyWalletDisplay } from "@/components/myWalletDisplay";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "debounce";
import { CalendarSection } from "@/components/calendar";

const WalletPage: React.FC = () => {
    const { isOpen, open, close } = useDisclosure(false);
    const [data, setData] = useState<Transaction[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [viewType, setViewType] = useState<string>(searchParams.get("view") ?? 'list');


    const getData = async() => {
        try {

            const queryString = new URLSearchParams(searchParams).toString();
            const url = `/api/transactions?${queryString}`;

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const resData = await res.json();
            setData(resData);

        } catch (error: any) {

        }
    }

    const handleSearch = debounce((query: string) => {
        // console.log("halooo", query)
        // if (searchParams.get('view') != "calendar"){
        //     return;
        // }

        const queryParams: string[] = [];
        if (query) {
            // console.log("masok sini", query)
            queryParams.push(`query=${query}`);
        }

        if (searchParams.get('type') != null) {
            queryParams.push(`type=${searchParams.get('type')}`);
        }
        if (searchParams.get('category') != null) {
            queryParams.push(`category=${searchParams.get('category')}`);
        }
        if (searchParams.get('month') != null) {
            queryParams.push(`month=${searchParams.get('month')}`);
        }
        if (searchParams.get('year') != null) {
            queryParams.push(`year=${searchParams.get('year')}`);
        }

        const finalQueryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        router.push(`/wallet${finalQueryString}`);

    }, 300)


    useEffect(() => {
        getData()
    }, [searchParams])

    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     getData();
    // }, [data])


    // useEffect(() => {
    //     if (viewType == 'list'){
    //         router.push('/wallet')
    //     } else {
    //         const queryParams: string[] = [];
    //         if (searchParams.get('month') != null) {
    //             queryParams.push(`month=${searchParams.get('month')}`);
    //         }

    //         if (searchParams.get('year') != null) {
    //             queryParams.push(`year=${searchParams.get('year')}`);
    //         }

    //         const finalQueryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';
            
    //         router.push(`/wallet?view=caleeeeendar${finalQueryString}`);
    //     }
    // }, [viewType])

    // console.log("ini dalem wallet: ", data);

    return (
        <div className="flex flex-col min-h-screen px-[15px] lg:px-[50px] md:py-[40px] py-[50px] gap-[45px]">
            <div className="flex flex-col gap-5">
                <section className="flex flex-row justify-between">
                    <h1 className="flex font-bold text-2xl md:text-3xl">William's Wallet</h1>

                    <nav className="flex items-center">
                        <div className="flex flex-row text-[14px] items-center">
                            <div
                                className={`chip to-left ${viewType == "list" ? "active-to-right border-r-0 text-stonks-000" : "active-to-left border-r-0 text-[#000033]"} border-stonks-200 px-[18px] py-1 rounded-l-xl border-[2px] text-center`}
                                onClick={() => setViewType("list")}
                            >
                                <GrList size={20}/>
                            </div>

                            <div
                                className={`chip to-right ${viewType == "calendar" ? "active-to-left border-l-0 text-stonks-000" : "active-to-right border-l-0 text-[#000033]"} border-stonks-200 px-[18px] py-1 rounded-r-xl border-[2px] text-center`}
                                onClick={() => setViewType("calendar")}
                            >
                                <HiOutlineCalendar size={20}/>
                            </div>
                        </div>
                    </nav>
                </section>

                {viewType == "list" &&
                    <div className="flex flex-col gap-[45px]">
                        <section className="flex flex-col gap-2">
                            <section className="flex flex-row gap-2 md:gap-5">
                                <SearchBar handleSearch={handleSearch}/>

                                <button className={`${isOpen ? 'bg-stonks-400 text-stonks-900' : 'bg-[#1a53a4]'} flex md:px-[22px] py-2 rounded-lg md:rounded-3xl text-stonks-000 items-center min-w-[58px] md:min-w-[115px] justify-center md:justify-between text-[14px] md:text-[16px]`} onClick={isOpen ? close : open}>
                                    <text className="text-[18px] md:text-[20px] hidden md:flex">
                                        <HiOutlineAdjustments />
                                    </text>
                                    {isOpen ? "Close" : "Filter"}
                                </button>
                            </section>

                            <SearchFilter isOpen={isOpen} onClose={close} viewType={viewType}/>
                        </section>

                        <MyWalletDisplay transactions={data} getData={getData}/>
                    </div>
                    
                }

                {viewType == "calendar" && 
                    <CalendarSection transactions={data} getData={getData}/>
                }
            </div>
        </div>
    )
}

export default WalletPage;