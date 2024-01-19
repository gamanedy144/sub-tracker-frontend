import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useChartsService } from '../../services/useChartsService';

const BarChart = () => {
  ChartJS.register(CategoryScale);
  const { useFetchCurrSpendings } = useChartsService();

  const { transformedData: currentSpendings } = useFetchCurrSpendings();
  const [userData, setUserData] = useState({
    labels: currentSpendings.map((data) => data.label),
    datasets: [
      {
        label: 'Spendings',
        data: currentSpendings.map((data) => data.value),
      },
    ],
  });
  const prevSpendingsRef = useRef(currentSpendings);
  useEffect(() => {
    if (prevSpendingsRef.current !== currentSpendings) {
      setUserData((prevUserData) => {
        // Compare the current and previous values and update only if changed
        if (
          JSON.stringify(prevUserData.labels) !==
          JSON.stringify(currentSpendings.map((data) => data.label))
        ) {
          return {
            labels: currentSpendings.map((data) => data.label),
            datasets: [
              {
                label: 'Spendings',
                data: currentSpendings.map((data) => data.value),
              },
            ],
          };
        } else {
          return prevUserData;
        }
      });

      prevSpendingsRef.current = currentSpendings;
    }
  }, [currentSpendings]);
  return <Bar data={userData} />;
};

export default BarChart;
