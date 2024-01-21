import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useData from '../hooks/useData';
import { Subscription } from '../models/Subscription';

import { apiService } from './api-client';
import { SubscriptionProvider } from '../models/SubscriptionProvider';

export const useSubscriptionProvidersService = () => {
  const authHeader = useAuthHeader();

  const saveSubscriptionProvider = async (
    subscription: SubscriptionProvider | any
  ) => {
    const controller = new AbortController();
    try {
      const response = await apiService.post(
        '/subscription-provider',
        subscription,
        {
          signal: controller.signal,
          headers: { Authorization: authHeader },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };

  const updateSubscriptionProvider = async (
    subscription: SubscriptionProvider | any
  ) => {
    const controller = new AbortController();
    try {
      const response = await apiService.put(
        '/subscription-provider/update',
        subscription,
        {
          signal: controller.signal,
          headers: { Authorization: authHeader },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };

  return { saveSubscriptionProvider, updateSubscriptionProvider };
};
