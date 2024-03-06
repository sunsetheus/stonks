import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables
  } from 'chart.js'
ChartJS.register(...registerables);

interface PieChartProps {
    datas: { category: string; money: number }[];
}

export const PieChart: React.FC<PieChartProps> = ({
    datas
}) => {

    // console.log(datas)
    return (
        <div className="flex w-[260px] h-[190px] lg:h-[242px]">
            <Pie
                data={{
                    labels: datas.map(data => data.category),
                    datasets: [
                        {
                            data: datas.map(data => data.money),
                            // backgroundColor: 
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: true
                }}
            />
        </div>
    )
}