import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Subscription } from '../models/Subscription';
import SubCard from './SubCard';
import { Grid, GridItem } from '@chakra-ui/react';

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
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        paddingX={5}
        paddingY={5}
        gap={5}
      >
        {subscriptions
          ? subscriptions.map((subscription) => (
              <SubCard subscription={subscription} key={subscription.id} />
            ))
          : error}
      </Grid>
    </>
  );
};

export default SubGrid;
