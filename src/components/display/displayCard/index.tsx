"use client"

import { DeleteModal } from "@/components/deleteModal";
import { DisplayRecentProps, getIcon } from "@/components/display/displayRecent";
import { ModalForm } from "@/components/modalForm";
import { RupiahFormatter } from "@/utils/calendarUtils";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { useEffect } from "react";
import { HiArrowDown, HiArrowUp, HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDisclosure } from "react-use-disclosure";

export interface DisplayCardProps {
    transaction: Transaction
    type: 'income' | 'expense'
    getData: () => void
}

export const DisplayCard: React.FC<DisplayCardProps> = ({
    transaction, type, getData
}) => {
    
    const deleteModal = useDisclosure(false);
    const editModal = useDisclosure(false);

    const deleteData = async() => {
        try {
            const res = await fetch(`/api/transactions/${transaction.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const resData = await res.json();
            getData();
            

        } catch (error: any) {

        }
    }

    return (
        <div className="grid grid-cols-10 md:grid-cols-8 px-4 py-2 lg:p-4 bg-stonks-000 rounded-md">
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                primaryButtonCallback={deleteData}
            />

            <ModalForm
                isOpen={editModal.isOpen}
                onClose={editModal.close}
            />

            <div className="col-span-4 md:col-span-3 flex flex-row items-center gap-3">
                <text className={`${type == "income" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"} lg:flex text-[25px] p-[6px] rounded-[4px] items-center justify-center hidden`}>{getIcon(transaction.category)}</text>

                <section className="flex flex-col justify-center">
                    <text className="text-[14px] lg:text-[18px]">{transaction.name}</text>
                    <div className="flex flex-row items-center gap-2">
                        <div className={`${type == "income" ? "border-green-500" : "border-red-500"} border-[4px] rounded-full`}></div>
                        <text className=" text-[10px]">{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</text>
                    </div>
                </section>
            </div>

            <div className="hidden col-span-2 md:flex items-center text-[16px]">
                <text className="">{format(transaction.date, "dd MMMM yyyy")}</text>
            </div>

            <div className="text-[14px] col-span-4 md:col-span-2 flex flex-col lg:flex-row lg:items-center justify-center pl-[6px] lg:justify-normal md:text-[16px]">
                <text className={`${transaction.type == "income" ? "text-green-600" : 'text-danger-100'} flex flex-row items-center gap-1 lg:gap-2`}>
                    <text className="text-[18x]">{transaction.type == 'income' ? <HiArrowUp /> : <HiArrowDown />}</text>
                    <text>{RupiahFormatter.format(transaction.money)}</text>
                </text>
                <text className="flex md:hidden text-[10px]">{format(transaction.date, "dd/MM/yy")}</text>

            </div>

            <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 lg:gap-3">
                <button className="text-stonks-000 bg-[#1a53a4] rounded-lg p-2 text-[16px] lg:text-[22px]" >
                    <HiOutlinePencilAlt />
                </button>

                <button className="bg-danger-100 text-stonks-000 rounded-lg p-2 text-[16px] lg:text-[22px]" onClick={deleteModal.open}>
                    <HiOutlineTrash />
                </button>
            </div>
        </div>
    )
}