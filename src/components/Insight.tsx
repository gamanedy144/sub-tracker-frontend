import React, { useEffect, useRef, useState } from 'react';
import { useChartsService } from '../services/useChartsService';

import { number } from 'zod';
import MonthlyBarChart from './charts/MonthlyBarChart';
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import CategoryPieChart from './charts/CategoryPieChart';
import EstimatedBarChart from './charts/EstimatedBarChart';
const Insight = () => {
  const { useFetchEstimatedCurrentYear } = useChartsService();

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

  const [currYearSpendings, setCurrYearSpendings] = useState(null);

  const { data: currentYearSpendings } = useFetchEstimatedCurrentYear();
  const prevCurrYearSpendings = useRef(currYearSpendings);
  console.log(currentYearSpendings);
  useEffect(() => {
    if (prevCurrYearSpendings.current !== currYearSpendings) {
      setCurrYearSpendings((prevUserData) => {
        return currentYearSpendings;
      });

      prevCurrYearSpendings.current = currYearSpendings;
    }
  }, [currYearSpendings]);
  return (
    <Grid
      templateAreas={` "monthly-spendings category-spendings"
                        "monthly-spendings nmk"
                        "monthly-spendings nmk"
                        "estimated-spendings estimated-spendings" `}
      templateColumns={{
        sm: '1fr',
        lg: '6fr 2fr',
      }}
      paddingX={10}
      paddingY={5}
      gap={5}
      height="90%"
      width="100%"
    >
      <GridItem area="monthly-spendings" height="100%">
        <Card>
          <CardHeader mb={-5}>
            <Heading fontSize={28}>Monthly Spendings</Heading>
          </CardHeader>
          <CardBody>
            <MonthlyBarChart />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="category-spendings" height="50%">
        <Card>
          <CardHeader mb={-5}>
            <Heading fontSize={28}>Category</Heading>
          </CardHeader>
          <CardBody>
            <CategoryPieChart />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem area="nmk">
        <Card>
          <CardHeader mb={-5}>
            <Heading fontSize={28}>Spendings this year</Heading>
          </CardHeader>
          <CardBody fontSize={24}>
            {typeof currentYearSpendings === 'number' && (
              <>£{currentYearSpendings.toFixed(2)}</>
            )}
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="estimated-spendings" pb={5}>
        <Card>
          <CardHeader mb={-5}>
            <Heading fontSize={28}>Estimated spendings per Month</Heading>
          </CardHeader>
          <CardBody>
            <EstimatedBarChart />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Insight;
