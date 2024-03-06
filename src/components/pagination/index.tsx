import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationProps {
    curentPage: number
    setCurentPage: (newCurentPage: number) => void
    entriData: number
    setEntriData:  (newEntriData: number) => void
    totalPages: number
}

export const Pagination: React.FC<PaginationProps> = ({
     curentPage, setCurentPage,
     entriData, setEntriData,
     totalPages
}) => {
    const startPageIndicator = Math.floor((curentPage - 1) / 5) * 5 + 1 // only show 5 page button
    // const endPageIndicator = totalPages - startPageIndicator >= 4 ? startPageIndicator + 4 : totalPages
    const endPageIndicator = 10 - startPageIndicator >= 4 ? startPageIndicator + 4 : 10
    const arrPageIndicator = Array.from(
      { length: endPageIndicator - startPageIndicator + 1 },
      (_, index) => startPageIndicator + index
    )
    return (
        <div className="flex justify-center">
            <div className="flex flex-row">
                <button className="flex hover:bg-stonks-200 px-[10px] py-[6px] rounded-full items-center" onClick={() => setCurentPage(curentPage - 1)} disabled={curentPage == 1 ? true : false}>
                    <HiChevronLeft size={20}/>
                    {/* <text>Previous Page</text> */}
                </button>

                <div className="flex flex-row gap-2 items-center">
                    {arrPageIndicator.map((value, key) => (
                        <div className="flex items-center">
                            {value > 5 && (value - 1) % 5 === 0 && (
                                <text className="flex px-3 py-2">
                                ...
                                </text>
                            )}

                            <text className={`${value == curentPage ? 'text-[#1a53a4] font-semibold' : 'text-stonks-500'} px-2 py-2 cursor-pointer`} key={key} onClick={() => setCurentPage(value)}>
                                {value}
                            </text>

                            {/* TODO: GANTI 10 KE totalPages */}
                            {Math.floor(value / 5) <= Math.floor((10 - 1) / 5) && value % 5 === 0 && ( 
                                <text
                                    className="flex px-3 py-2"
                                >
                                    ...
                                </text>
                            )}
                        </div>
                    ))}
                </div>

                <button className="flex hover:bg-stonks-200 px-[10px] py-[6px] rounded-full items-center justify-center" onClick={() => setCurentPage(curentPage + 1)}>
                    <HiChevronRight size={20}/>
                </button>
            </div>
            
        </div>
    )
}