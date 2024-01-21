import { Transaction } from '../models/Transaction';
import useData from './useData';

const useTransactions = () => {
  const { data, error, isLoading, refetch } =
    useData<Transaction>('/transaction');
  const convertToComparable = (value) => {
    return typeof value === 'string' ? new Date(value) : value;
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        const dateA = convertToComparable(a.timestamp);
        const dateB = convertToComparable(b.timestamp);

        return dateB - dateA;
      })
    : null;
  return { sortedData, error, isLoading, refetch };
};
export default useTransactions;
