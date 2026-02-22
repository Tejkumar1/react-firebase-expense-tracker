import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function CategoryChart({ expenses }) {
  const grouped = {};

  expenses.forEach(e => {
    grouped[e.category] =
      (grouped[e.category] || 0) + Number(e.amount);
  });

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(grouped),
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        Expenses by Category
      </h3>
      <Bar data={data} />
    </div>
  );
}