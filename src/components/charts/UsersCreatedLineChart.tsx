import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useChartsService } from '../../services/useChartsService';
import { Box, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

const UsersCreatedLineChart = () => {
  const { useFetchUsersCreatedMonthly } = useChartsService();

  const { transformedData: categorySpendings } = useFetchUsersCreatedMonthly();

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
                label: 'Users created',
                data: categorySpendings.map((data) => data.value),
                backgroundColor: ['black'],
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
  return (
    <Card height="100%">
      <CardHeader>
        <Heading fontSize={28} mb={-5}>
          Users Created
        </Heading>
      </CardHeader>
      <CardBody>
        <Line data={userData} />
      </CardBody>
    </Card>
  );
};

export default UsersCreatedLineChart;
