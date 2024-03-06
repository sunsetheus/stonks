"use client"

import { useEffect, useState } from "react";
import { FilterInputChip } from "../filterInputChip";
import { EXPENSE_CATEGORY_FILTER_OPTIONS, INCOME_CATEGORY_FILTER_OPTIONS, MONTH_FILTER_OPTIONS, TYPE_FILTER_OPTIONS, YEAR_FILTER_OPTIONS } from "@/utils/contant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchFilterProps {
    isOpen: boolean;
    onClose: () => void;
    viewType: string
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    isOpen, viewType
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ss = new URLSearchParams(searchParams.toString());

    const [filterTypeValue, setFilterTypeValue] = useState<string[]>(searchParams.get("type")?.split(',') || ['all']);
    const [filterCategoryValue, setFilterCategoryValue] = useState<string[]>(searchParams.get("category")?.split(',') || ['all']);
    const [filterMonthValue, setFilterMonthValue] = useState<string[]>(searchParams.get("month")?.split(',') || ['all']);
    const [filterYearValue, setFilterYearValue] = useState<string[]>(searchParams.get("year")?.split(',') || ['all']);

    // sorry for the dirty code :"), idk the best practice to implement this, so this just what's my mind come
    const handleFilter = (value: string, filter: "type" | "category" | "month" | "year") => {
        let stateValue: string[] = [];
        let setStateValue: React.Dispatch<React.SetStateAction<string[]>>;

        //sempet kepikiran mau buat fitur kalo user pilih semua opsi, langsung pindahin ke all
        switch (filter) {
            case "type":
                stateValue = filterTypeValue;
                setStateValue = setFilterTypeValue;
                break;
            case "category":
                stateValue = filterCategoryValue;
                setStateValue = setFilterCategoryValue;
                break;
            case "month":
                stateValue = filterMonthValue;
                setStateValue = setFilterMonthValue;
                break;
            case "year":
                stateValue = filterYearValue;
                setStateValue = setFilterYearValue;
                break;
        }

        if (stateValue.includes("all") && value == "all") { //all click all
        } 
        else if (stateValue.includes("all") && value != "all") { //all click value
            setStateValue([value]);
        } 
        else if (!stateValue.includes("all") && value == "all") { //value click all
            setStateValue(["all"]);
        } 
        else if (!stateValue.includes("all") && value != "all" && !stateValue.includes(value)) { //value click new value
            setStateValue([...stateValue, value]);
        } 
        else if (!stateValue.includes("all") && value != "all" && stateValue.includes(value)) { //value click old value
            setStateValue(stateValue.filter(type => type !== value));
            stateValue.length == 1 && setStateValue(["all"]);
        }
    }

    useEffect(() => {
        const queryParams: string[] = [];

        if (ss.get("query")) {
            queryParams.push(`query=${ss.get("query")}`);
        }
        if (!filterTypeValue.includes('all')) {
            queryParams.push(`type=${filterTypeValue.join(',')}`);
        }
        if (!filterCategoryValue.includes('all')) {
            queryParams.push(`category=${filterCategoryValue.join(',')}`);
        }
        if (!filterMonthValue.includes('all')) {
            queryParams.push(`month=${filterMonthValue.join(',')}`);
        }
        if (!filterYearValue.includes('all')) {
            queryParams.push(`year=${filterYearValue.join(',')}`);
        }

        const finalQueryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        // console.log(`push ke ${finalQueryString}`)
        router.push(`/wallet${finalQueryString}`);
        
    }, [filterTypeValue, filterCategoryValue, filterMonthValue, filterYearValue])

    useEffect(() => {
        setFilterTypeValue(['all'])
        setFilterCategoryValue(['all'])
        setFilterMonthValue(['all'])
        setFilterYearValue(['all'])
    }, [viewType])

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} flex flex-col gap-5`}>
            <section className="flex flex-col gap-1">
                <text className="flex text-[14px]">Search by type</text>

                <div className="flex flex-wrap gap-2">
                    {TYPE_FILTER_OPTIONS.map((type, key) => (
                        <FilterInputChip 
                            key={key}
                            value={type.value}
                            chipValue={filterTypeValue}
                            filter="type"
                            handleFilter={handleFilter}
                        >
                            {type.display}
                        </FilterInputChip>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-1">
                <text className="flex text-[14px]">Search by category</text>

                <div className="flex flex-wrap gap-2">
                    <FilterInputChip 
                        value={"all"}
                        chipValue={filterCategoryValue}
                        filter="category"
                        handleFilter={handleFilter}
                    >
                        All
                    </FilterInputChip>

                    {(filterTypeValue.includes("income") || filterTypeValue.includes("all")) &&
                        INCOME_CATEGORY_FILTER_OPTIONS.map((category, key) => (
                            <FilterInputChip 
                                key={key}
                                value={category.value}
                                chipValue={filterCategoryValue}
                                filter="category"
                                handleFilter={handleFilter}
                            >
                                {category.display}
                            </FilterInputChip>
                        ))}

                    {(filterTypeValue.includes("expense") || filterTypeValue.includes("all")) &&
                        EXPENSE_CATEGORY_FILTER_OPTIONS.map((category, key) => (
                            <FilterInputChip 
                                key={key}
                                value={category.value}
                                chipValue={filterCategoryValue}
                                filter="category"
                                handleFilter={handleFilter}
                            >
                                {category.display}
                            </FilterInputChip>
                        ))
                    }
                </div>
            </section>

            <section className="flex flex-col gap-1">
                <text className="flex text-[14px]">Search by month</text>

                <div className="flex flex-wrap gap-2 max-w-[90%]">
                    {MONTH_FILTER_OPTIONS.map((month, key) => (
                        <FilterInputChip
                            key={key}
                            value={month.value}
                            chipValue={filterMonthValue}
                            filter="month"
                            handleFilter={handleFilter}
                        >
                            {month.display}
                        </FilterInputChip>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-1">
                <text className="flex text-[14px]">Search by year</text>

                <div className="flex flex-wrap gap-2">
                    {YEAR_FILTER_OPTIONS.map((year, key) => (
                        <FilterInputChip
                            key={key}
                            value={year.value}
                            chipValue={filterYearValue}
                            filter="year"
                            handleFilter={handleFilter}
                        >
                            {year.display}
                        </FilterInputChip>
                    ))}
                </div>
            </section>

            <div className="h-[2px] bg-stonks-400"/>
        </div>
    )
}