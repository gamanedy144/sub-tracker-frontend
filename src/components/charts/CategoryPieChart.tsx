import React, { useEffect, useRef, useState } from 'react';
import { useChartsService } from '../../services/useChartsService';
import { Pie } from 'react-chartjs-2';

const CategoryPieChart = () => {
  const { useFetchCategorySpendingsMonthly } = useChartsService();

  const { transformedData: categorySpendings } =
    useFetchCategorySpendingsMonthly();

  const [userData, setUserData] = useState({
    labels: categorySpendings.map((data) => data.label),
    datasets: [
      {
        label: 'Spendings',
        data: categorySpendings.map((data) => data.value),
      },
    ],
  });
  const prevSpendingsRef = useRef(categorySpendings);

  useEffect(() => {
    if (prevSpendingsRef.current !== categorySpendings) {
      setUserData((prevUserData) => {
        // Compare the current and previous values and update only if changed
        if (
          JSON.stringify(prevUserData.labels) !==
          JSON.stringify(categorySpendings.map((data) => data.label))
        ) {
          return {
            labels: categorySpendings.map((data) => data.label),
            datasets: [
              {
                label: 'Spendings',
                data: categorySpendings.map((data) => data.value),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.75)',
                  'rgba(255, 159, 64, 0.75)',
                  'rgba(255, 205, 86, 0.75)',
                  'rgba(75, 192, 192, 0.75)',
                  'rgba(54, 162, 235, 0.75)',
                  'rgba(153, 102, 255, 0.75)',
                  'rgba(201, 203, 207, 0.75)',
                ],
              },
            ],
          };
        } else {
          return prevUserData;
        }
      });
      prevSpendingsRef.current = categorySpendings;
    }
  }, [categorySpendings]);
  return <Pie data={userData} />;
};

export default CategoryPieChart;
