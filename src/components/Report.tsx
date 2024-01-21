import {
  Box,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  StackItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useTransactions from '../hooks/useTransactions';
import moment from 'moment';
import { capitalizeFirstLetter } from '../utils/capitalize';

const Report = () => {
  const { sortedData: transactions, refetch } = useTransactions();

  const toUserFriendlyDate = (date: Date) => {
    const momentDate = moment(date);
    return momentDate.format('YYYY-MM-DD HH:mm:ss');
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Grid
      templateAreas={` "list filter"`}
      templateColumns={{
        sm: '1fr',
        lg: '4fr 1fr',
      }}
      paddingX={10}
      paddingY={5}
      gap={5}
      height="90%"
    >
      <GridItem area="list" overflowY="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  ID
                </Box>
              </Th>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  Subscription Name
                </Box>
              </Th>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  Type
                </Box>
              </Th>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  Price
                </Box>
              </Th>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  Timestamp
                </Box>
              </Th>
              <Th>
                <Box as="span" fontWeight="bold" fontSize={18} color={'white'}>
                  Status
                </Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.id}</Td>
                <Td>{transaction.subscription.subscriptionName}</Td>
                <Td>{capitalizeFirstLetter(transaction.subscription.type)}</Td>
                <Td>£{transaction.subscription.price}</Td>
                <Td>{toUserFriendlyDate(transaction.timestamp)}</Td>
                <Td>{transaction.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GridItem>

      <GridItem area="filter" bg="dodgerblue">
        <div>filter</div>
      </GridItem>
    </Grid>
  );
};

export default Report;
