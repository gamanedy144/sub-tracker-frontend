import { Subscription } from '../models/Subscription';
import useData from './useData';

const useSubscriptions = () => {
  const { data, error, isLoading, refetch } =
    useData<Subscription>('/subscription');

  return { data, error, isLoading, refetch };
};
export default useSubscriptions;
