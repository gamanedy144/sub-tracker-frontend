import { object } from 'zod';
import useData from '../hooks/useData';
import { Subscription } from '../models/Subscription';
import axios from 'axios';
import apiClient from './api-client';

// eslint-disable-next-line react-hooks/rules-of-hooks
const fetchSubscriptions = () => useData<Subscription>('/subscription');

const postSubscription = async (subscription: Subscription | any) => {
  try {
    const response = await apiClient.post('/subscription', {
      ...subscription,
      user: { id: 1 },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error.message);
    throw new Error(`Failed to make POST request: ${error.message}`);
  }
};

export { fetchSubscriptions, postSubscription };
