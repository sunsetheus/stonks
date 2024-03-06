
import { Bar } from 'react-chartjs-2';
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

interface BarChartProps {
    datas: { month: string; income: number; expense: number }[];
}

export const BarChart: React.FC<BarChartProps> = ({
    datas
}) => {
    // console.log("Data inside", datas);

    return (
        <div className='flex w-[260px] h-[190px] md:w-[660px] md:h-[400px]'>
        <Bar
            data={{
                labels: datas.map(data => data.month),
                datasets: [
                    {
                        label: "Income",
                        data: datas.map(data => data.income),
                        backgroundColor: "#1a53a4"
                    },
                    {
                        label: "Expense",
                        data: datas.map(data => data.expense),
                        backgroundColor: "#E60000"
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false,
                responsive: true
            }}
        />
        </div>
    );
};
