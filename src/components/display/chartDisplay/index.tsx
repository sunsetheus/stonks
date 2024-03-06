import { getIcon } from "@/components/display/displayRecent"
import { RupiahFormatter } from "@/utils/calendarUtils"
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi"

interface ChartDisplayProps {
    label: string
    year: number
    type: string
    category: string
    money: number //ud terlanjur pake money, bukan amount (just for consistency)
}

export const ChartDisplay: React.FC<ChartDisplayProps> = ({
    label, year, category, type, money
}) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <text>{label}</text>
                <text>{year}</text>
            </div>

            <div>
                {type == "income" ? <HiArrowSmUp size={20}/> : <HiArrowSmDown size={20}/>}
                <text>{RupiahFormatter.format(money)}</text>
            </div>

        </div>
    )
}