import { useOutsideClick } from "@/hooks/useOutsideClick";
import { HiTrash } from "react-icons/hi";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    primaryButtonCallback: () => void
  }

export const DeleteModal: React.FC<ModalProps> = ({
    isOpen, onClose, primaryButtonCallback
}) => {
    const ref = useOutsideClick(onClose);

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col w-[90%] md:w-3/5 lg:w-1/5 max-h-[90%] gap-5 min-w-[360px] bg-stonks-000 rounded-xl p-4 lg:p-6" ref={ref}>
                <div className="flex items-center flex-col gap-2">
                    <text className="text-danger-100 bg-red-300 p-2 text-[25px] rounded-lg"><HiTrash /></text>
                    <text className="text-center text-[#00001d]">Are you sure you want to delete this transaction?</text>
                </div>

                <div className="flex flex-row w-full gap-4">
                    <button className="flex w-full px-3 py-1 justify-center rounded-md border-[2px] border-danger-100 text-danger-100 items-center" onClick={() => {onClose()}}>
                        Never Mind
                    </button>

                    <button className="flex bg-danger-100 px-3 py-1 text-stonks-000 w-full justify-center rounded-md items-center" onClick={() => {primaryButtonCallback(); onClose()}}>
                        <text className="">Delete</text>
                    </button>
                </div>
            </div>
        </div>
    )
}