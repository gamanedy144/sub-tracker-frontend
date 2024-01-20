import { Subscription } from '../models/Subscription';
import useData from './useData';

const useSubscriptions = () => {
  const { data, error, isLoading, refetch } =
    useData<Subscription>('/subscription');

  const convertToComparable = (value) => {
    return typeof value === 'string' ? new Date(value) : value;
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        const dateA = convertToComparable(a.nextOccurrenceDate);
        const dateB = convertToComparable(b.nextOccurrenceDate);

        return dateA - dateB;
      })
    : null;

  console.log(sortedData);

  return { sortedData, error, isLoading, refetch };
};
export default useSubscriptions;
