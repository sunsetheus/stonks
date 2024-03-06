import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    registerables
  } from 'chart.js'
ChartJS.register(...registerables);

interface LineChartProps {
    datas: { month: string; netIncome: number }[];
}

export const LineChart: React.FC<LineChartProps> = ({
    datas
}) => {
    return (
        <div className="flex w-[260px] h-[190px] lg:h-[242px]">
            <Line 
                data={{
                    labels: datas.map(data => data.month),
                    datasets: [
                        {
                            label: "Net Income",
                            data: datas.map(map => map.netIncome),
                            borderColor: '#1a53a4'
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