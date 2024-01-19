import React, { useEffect, useRef, useState } from 'react';
import { useChartsService } from '../services/useChartsService';

import { number } from 'zod';
import BarChart from './charts/BarChart';
const Insight = () => {
  const {
    useFetchCurrSpendings,
    useFetchCategorySpendingsMonthly,
    useFetchCurrentYearSpendings,
    useFetchEstimationsMonthlySpendings,
  } = useChartsService();

  //   const { transformedData: currentSpendings } = useFetchCurrSpendings();
  //   const [userData, setUserData] = useState({
  //     labels: currentSpendings.map((data) => data.label),
  //     datasets: [
  //       {
  //         label: 'Spendings',
  //         data: currentSpendings.map((data) => data.value),
  //       },
  //     ],
  //   });
  //   const prevSpendingsRef = useRef(currentSpendings);
  const dummyData: { [key: string]: number } = {
    '2024-01': 1445,
    '2024-02': 200.75,
    '2024-03': 180.3,
    // Add more data as needed
  };

  const { transformedData: categorySpendingsMonthly } =
    useFetchCategorySpendingsMonthly();

  const { transformedData: currentYearSpendings } =
    useFetchCurrentYearSpendings();
  const { transformedData: estimatedMonthlySpendings } =
    useFetchEstimationsMonthlySpendings(12);

  const [estimatedData, setEstimatedData] = useState({
    labels: estimatedMonthlySpendings.map((data) => data.label),
    datasets: [
      {
        label: 'Spendings',
        data: estimatedMonthlySpendings.map((data) => data.value),
      },
    ],
  });

  return (
    <>
      <div>Monthly Spendings</div>
      <BarChart />
    </>
  );
};

export default Insight;
