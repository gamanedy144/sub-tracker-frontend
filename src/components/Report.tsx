import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import moment from 'moment';
import { capitalizeFirstLetter } from '../utils/capitalize';
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import {
  mapToBackendValue,
  subscriptionTypes,
  subscriptionTypesObjs,
} from '../utils/subscriptionEnums';
import { Transaction } from '../models/Transaction';
import { apiService } from '../services/api-client';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { CanceledError } from 'axios';

const Report = () => {
  const authHeader = useAuthHeader();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [filter, setFilter] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: '',
    status: '',
    subscriptionName: '',
  });
  const [statusOptions, setStatusOptions] = useState([
    'SUCCESS',
    'PENDING',
    'FAILED',
  ]);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [sortedFilteredTransactions, setSortedFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
  const applyFilter = () => {
    setIsApplyingFilter(true);
    let filteredData = [...transactions];

    // Apply filtering based on filter state
    if (filter.type) {
      filteredData = filteredData.filter(
        (transaction) => transaction.subscription.type === filter.type
      );
    }
    if (filter.minPrice) {
      filteredData = filteredData.filter(
        (transaction) =>
          transaction.subscription.price >= parseFloat(filter.minPrice)
      );
    }
    if (filter.maxPrice) {
      filteredData = filteredData.filter(
        (transaction) =>
          transaction.subscription.price <= parseFloat(filter.maxPrice)
      );
    }
    if (filter.startDate && filter.endDate) {
      filteredData = filteredData.filter((transaction) =>
        moment(transaction.timestamp).isBetween(
          moment(filter.startDate),
          moment(filter.endDate),
          null,
          []
        )
      );
    }
    if (filter.status) {
      filteredData = filteredData.filter(
        (transaction) => transaction.status === filter.status
      );
    }
    if (filter.subscriptionName) {
      filteredData = filteredData.filter((transaction) =>
        transaction.subscription.subscriptionName
          .toLowerCase()
          .includes(filter.subscriptionName.toLowerCase())
      );
    }

    setFilteredTransactions(filteredData); // Update the filteredTransactions state with the filtered data
  };

  const resetFilter = () => {
    // Reset filter logic here
    setFilter({
      type: '',
      minPrice: '',
      maxPrice: '',
      startDate: '',
      endDate: '',
      status: '',
      subscriptionName: '',
    });
    setFilteredTransactions(transactions);
  };
  const toUserFriendlyDate = (date: Date) => {
    const momentDate = moment(date);
    return momentDate.format('YYYY-MM-DD HH:mm:ss');
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  // const sortedFilteredTransactions = [...filteredTransactions].sort((a, b) => {
  //   if (sortConfig.key !== null) {
  //     let comparisonValueA = a[sortConfig.key];
  //     let comparisonValueB = b[sortConfig.key];

  //     // For 'subscription.subscriptionName' and 'subscription.price', we need to extract the relevant property
  //     if (sortConfig.key === 'subscription.subscriptionName') {
  //       comparisonValueA = a.subscription.subscriptionName.toLowerCase();
  //       comparisonValueB = b.subscription.subscriptionName.toLowerCase();
  //     } else if (sortConfig.key === 'subscription.price') {
  //       comparisonValueA = a.subscription.price;
  //       comparisonValueB = b.subscription.price;
  //     } else if (sortConfig.key === 'subscription.type') {
  //       comparisonValueA = a.subscription.type;
  //       comparisonValueB = b.subscription.type;
  //     }

  //     if (comparisonValueA < comparisonValueB) {
  //       return sortConfig.direction === 'asc' ? -1 : 1;
  //     }
  //     if (comparisonValueA > comparisonValueB) {
  //       return sortConfig.direction === 'asc' ? 1 : -1;
  //     }
  //   }
  //   return 0;
  // });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const sortTransactions = (data, config) => {
    console.log('alo alo');
    const sortedData = [...data].sort((a, b) => {
      if (config.key !== null) {
        let comparisonValueA = a[config.key];
        let comparisonValueB = b[config.key];

        if (config.key === 'subscription.subscriptionName') {
          comparisonValueA = a.subscription.subscriptionName.toLowerCase();
          comparisonValueB = b.subscription.subscriptionName.toLowerCase();
        } else if (config.key === 'subscription.price') {
          comparisonValueA = a.subscription.price;
          comparisonValueB = b.subscription.price;
        } else if (config.key === 'subscription.type') {
          comparisonValueA = a.subscription.type;
          comparisonValueB = b.subscription.type;
        }

        if (comparisonValueA < comparisonValueB) {
          return config.direction === 'asc' ? -1 : 1;
        }
        if (comparisonValueA > comparisonValueB) {
          return config.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

    return sortedData;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const response = await apiService.get('/transaction', {
          signal: controller.signal,
          headers: { Authorization: authHeader },
        });
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setSortedFilteredTransactions(
          sortTransactions(filteredTransactions, sortConfig)
        );
      } catch (error) {
        if (error instanceof CanceledError) return;
        // Handle error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSortedFilteredTransactions(filteredTransactions);
  }, [filteredTransactions]);
  useEffect(() => {
    setSortedFilteredTransactions(
      sortTransactions(filteredTransactions, sortConfig)
    );
  }, [sortConfig]);
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUpIcon />
      ) : (
        <ChevronDownIcon />
      );
    }
    return <ArrowUpDownIcon fontSize={'12px'} fontWeight={''} />;
  };

  return (
    <Grid
      templateAreas={`"list filter"`}
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
        <Card borderRightRadius={'0px'}>
          <CardBody>
            <Table variant="striped">
              <Thead>
                <Tr>
                  {/* <Th onClick={() => requestSort('id')}>
                    <Box as="span" fontWeight="bold" fontSize={16} color={'white'}>
                      ID {renderSortIcon('id')}
                    </Box>
                  </Th> */}
                  <Th
                    onClick={() => requestSort('subscription.subscriptionName')}
                  >
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Subscription Name{' '}
                      {renderSortIcon('subscription.subscriptionName')}
                    </Box>
                  </Th>
                  <Th onClick={() => requestSort('subscription.type')}>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Type {renderSortIcon('subscription.type')}
                    </Box>
                  </Th>
                  <Th onClick={() => requestSort('subscription.price')}>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Price {renderSortIcon('subscription.price')}
                    </Box>
                  </Th>
                  <Th onClick={() => requestSort('timestamp')}>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Timestamp {renderSortIcon('timestamp')}
                    </Box>
                  </Th>
                  <Th onClick={() => requestSort('status')}>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Status {renderSortIcon('status')}
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedFilteredTransactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    {/* <Td>{transaction.id}</Td> */}
                    <Td>{transaction.subscription.subscriptionName}</Td>
                    <Td>
                      {capitalizeFirstLetter(transaction.subscription.type)}
                    </Td>
                    <Td>£{transaction.subscription.price}</Td>
                    <Td>{toUserFriendlyDate(transaction.timestamp)}</Td>
                    <Td>{transaction.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="filter" bg="dodgerblue">
        <Card>
          <CardHeader>
            <Heading fontSize={28} mb={-5}>
              Filter
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack mb={4}>
              <Select
                placeholder="Type"
                name="type"
                value={filter.type}
                onChange={handleFilterChange}
                mr={2}
              >
                {subscriptionTypesObjs.map((obj) => (
                  <option key={obj.label} value={obj.value}>
                    {capitalizeFirstLetter(obj.label)}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Min Price"
                name="minPrice"
                value={filter.minPrice}
                onChange={handleFilterChange}
                mr={2}
              />
              <Input
                placeholder="Max Price"
                name="maxPrice"
                value={filter.maxPrice}
                onChange={handleFilterChange}
                mr={2}
              />
              <Input
                placeholder="Start Date"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilterChange}
                mr={2}
              />
              <Input
                placeholder="End Date"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilterChange}
                mr={2}
              />
              <Select
                placeholder="Status"
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                mr={2}
              >
                {statusOptions.map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Subscription Name"
                name="subscriptionName"
                value={filter.subscriptionName}
                onChange={handleFilterChange}
                mr={2}
              />
              <HStack>
                <Button colorScheme="blue" onClick={applyFilter}>
                  Filter
                </Button>
                <Button colorScheme="red" onClick={resetFilter}>
                  Reset
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Report;
