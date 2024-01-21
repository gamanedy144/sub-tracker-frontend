import { User } from './../models/Account';

import useData from './useData';

const useUsers = () => {
  const { data, error, isLoading, refetch } = useData<User>('/user');
  const convertToComparable = (value) => {
    return typeof value === 'string' ? new Date(value) : value;
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        const dateA = convertToComparable(a.createTs);
        const dateB = convertToComparable(b.createTs);

        return dateB - dateA;
      })
    : null;
  return { sortedData, error, isLoading, refetch };
};
export default useUsers;
