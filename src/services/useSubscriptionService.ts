import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useData from '../hooks/useData';
import { Subscription } from '../models/Subscription';

import { apiService } from './api-client';

export const useSubscriptionService = () => {
  const authHeader = useAuthHeader();

  const postSubscription = async (subscription: Subscription | any) => {
    const controller = new AbortController();
    try {
      const response = await apiService.post('/subscription', subscription, {
        signal: controller.signal,
        headers: { Authorization: authHeader },
      });
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };
  return { postSubscription };
};
