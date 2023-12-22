import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Subscription } from '../models/Subscription';

const SubGrid = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get<Subscription[]>('/subscription')
      .then((res) => setSubscriptions(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>{subscription.subscriptionName}</li>
        ))}
      </ul>
    </>
  );
};

export default SubGrid;
