import { useOutsideClick } from "@/hooks/useOutsideClick"
import { CalendarDisplayProps } from "../calendarDisplay"
import { format } from "date-fns"
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"
import { DeleteModal } from "@/components/deleteModal"
import { ModalForm } from "@/components/modalForm"
import { useDisclosure } from "react-use-disclosure"
import { DisplayCardSidebar } from "../displayCardCalendar"

interface CalendarSidebarProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    data: Omit<CalendarDisplayProps, 'calendarDate' | 'handleClick'>
    getData: () => void
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
    isOpen, setIsOpen, data, getData
}) => {
    const ref = useOutsideClick(() => setIsOpen(false));
    


  

    return (
        <div className={`fixed top-0 right-0 h-screen flex flex-col ${isOpen ? 'block w-[290px]' : 'right-[-55px] w-0'} bg-[#00001d] text-stonks-100 px-5 py-6 gap-[20px] duration-300 ease-in-out z-[999]`} ref={ref}>
            
            <div className={`${isOpen ? 'justify-center' : 'hidden'} flex text-[20px] py-2 whitespace-nowrap border-b-[2px] border-stonks-100`}>
                {format(data?.date, 'dd MMMM yyyy')}
            </div>

            <div className={`${!isOpen && 'hidden'} flex flex-col gap-2`}>
                {data.transactions.map((props, key) => (
                    <DisplayCardSidebar 
                        key={key}
                        props={props}
                        getData={getData}
                    />
                ))}

                {data.transactions.length == 0 && <text className="text-center text-stonks-300">There are no transactions on this date</text>}
            </div>

            
        </div>
    )
}