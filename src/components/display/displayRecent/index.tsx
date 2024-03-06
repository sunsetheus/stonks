import type { Transaction } from "@prisma/client"
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi"

import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineGift } from "react-icons/hi";
import { TbShirt } from "react-icons/tb";
import { MdOutlineFastfood } from "react-icons/md"
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { HiOutlineMinusSm } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";
import { ModalForm } from "@/components/modalForm";
import { DeleteModal } from "@/components/deleteModal";

export const ICON_MAP: Record<string, React.ReactNode> = {
    allowance: <HiOutlineCurrencyDollar />,
    bonus: <HiOutlineGift />,
    salary: <HiOutlineBriefcase />,
    education: <HiOutlineAcademicCap />,
    fashion: <TbShirt />,
    food: <MdOutlineFastfood />,
    household: <HiOutlineHome />,
    transport: <MdOutlineDirectionsCar />,
    other: <HiOutlineMinusSm />,
}

export const getIcon = (category: string) => {
    return ICON_MAP[category];
}

export interface DisplayRecentProps {
    transaction: Transaction
    type: 'income' | 'expense'
}

export const DisplayRecent: React.FC<DisplayRecentProps> = ({
    transaction, type
}) => {

    const deleteModal = useDisclosure(false);
    const editModal = useDisclosure(false);

    return (
        <div className="grid md:grid-cols-10 grid-cols-9">
            <div className="md:col-span-5 col-span-6 flex flex-row items-center py-1 gap-2">
                <text className={`${type == "income" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"} flex text-[23px] p-[6px] rounded-md items-center justify-center`}>{getIcon(transaction.category)}</text>
                
                <div className="flex md:flex-row flex-col">
                    <text className="text-[16px] md:text-[18px]">{transaction.name}</text>

                    <div className="flex-row items-center py-1 gap-2 md:hidden flex">
                        <div className={`${type == "income" ? "border-green-500" : "border-red-500"} border-[3px] rounded-full`}></div>
                        <text className="text-[12px]">{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</text>
                    </div>

                </div>
            </div>

            <div className="col-span-3 flex-row items-center py-1 gap-2 hidden md:flex">
                <div className={`${type == "income" ? "border-green-500" : "border-red-500"} border-[5px] rounded-full`}></div>
                <text className="text-[18px]">{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</text>
            </div>

            <div className={`${type == "income" ? "text-green-700" : "text-red-700"} md:col-span-2 col-span-3 flex flex-row items-center py-1 justify-end`}>
                {type == "income" ? <HiArrowSmUp size={22}/> : <HiArrowSmDown size={22}/>}
                <text className="text-[20px]">{transaction.money}</text>
            </div>
            
        </div>
    )
}