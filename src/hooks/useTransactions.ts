import { Transaction } from '../models/Transaction';
import useData from './useData';

const useTransactions = () => {
  const { data, error, isLoading, refetch } =
    useData<Transaction>('/transaction');

  return { data, error, isLoading, refetch };
};
export default useTransactions;
