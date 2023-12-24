import { SubscriptionProvider } from '../models/SubscriptionProvider';
import useData from './useData';

const useSubscriptionProviders = () =>
  useData<SubscriptionProvider>('/subscription-provider');

export default useSubscriptionProviders;
