import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useChartsService } from '../../services/useChartsService';

const EstimatedBarChart = () => {
  ChartJS.register(CategoryScale);
  const { useFetchEstimationsMonthlySpendings } = useChartsService();

  const { transformedData: estimatedSpendings } =
    useFetchEstimationsMonthlySpendings(12);
  const [userData, setUserData] = useState({
    labels: estimatedSpendings.map((data) => data.label),
    datasets: [
      {
        label: 'Estimated Spendings',
        data: estimatedSpendings.map((data) => data.value),
      },
    ],
  });
  const prevSpendingsRef = useRef(estimatedSpendings);
  useEffect(() => {
    if (prevSpendingsRef.current !== estimatedSpendings) {
      setUserData((prevUserData) => {
        // Compare the current and previous values and update only if changed
        if (
          JSON.stringify(prevUserData.labels) !==
          JSON.stringify(estimatedSpendings.map((data) => data.label))
        ) {
          return {
            labels: estimatedSpendings.map((data) => data.label),
            datasets: [
              {
                label: 'Spendings',
                data: estimatedSpendings.map((data) => data.value),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(150, 90, 75, 0.2)',
                  'rgba(150, 203, 207, 0.2)',
                  'rgba(67, 255, 101, 0.2)',
                  'rgba(10, 10, 207, 0.2)',
                  'rgba(125, 10, 10, 0.2)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',
                  'rgba(150, 90, 75)',
                  'rgba(150, 203, 207)',
                  'rgba(67, 255, 101)',
                  'rgba(10, 10, 207)',
                  'rgba(125, 10, 10)',
                ],
                borderWidth: 1,
              },
            ],
          };
        } else {
          return prevUserData;
        }
      });

      prevSpendingsRef.current = estimatedSpendings;
    }
  }, [estimatedSpendings]);
  return <Bar data={userData} />;
};

export default EstimatedBarChart;
