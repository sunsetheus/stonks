import { DeleteModal } from "@/components/deleteModal";
import { Transaction } from "@prisma/client"
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"
import { useDisclosure } from "react-use-disclosure";



export const DisplayCardSidebar: React.FC<{props: Transaction, getData: () => void}> = ({
    props, getData
}) => {
    const deleteModal = useDisclosure(false);
    const editModal = useDisclosure(false);

    const deleteData = async() => {
        // console.log("ke sini bro")
        try {
            const res = await fetch(`/api/transactions/${props.id}`, {
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
        <div>
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                primaryButtonCallback={deleteData}
            />

            <div className={`${props.type == 'income' ? 'bg-green-300' : 'bg-red-300'} flex-row grid grid-cols-3 p-2 rounded-lg whitespace-nowrap`}>
            

            {/* <ModalForm
                isOpen={editModal.isOpen}
                onClose={editModal.close}
            /> */}
            
        
        <div className="flex flex-col col-span-2 text-[#00001d]">
            <text className="text-[14px]">{props.name}</text>
            <text className="text-[12px]">{props.money}</text>
        </div>

        <div className="flex col-span-1 justify-end gap-1 items-center">
            <button className="text-stonks-000 bg-[#1a53a4] rounded-lg p-2 text-[10px] lg:text-[14px]">
                <HiOutlinePencilAlt />
            </button>

            <button className="bg-danger-100 text-stonks-000 rounded-lg p-2 text-[10px] lg:text-[14px]" onClick={deleteModal.open}>
                <HiOutlineTrash />
            </button>
        </div>
    </div>

        </div>
        
    )
}