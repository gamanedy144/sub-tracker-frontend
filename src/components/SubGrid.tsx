import SubCard from './SubCard';
import { Grid } from '@chakra-ui/react';
import useSubscriptions from '../hooks/useSubscriptions';
import useSubscriptionProviders from '../hooks/useSubscriptionProviders';

const SubGrid = () => {
  const { data: subscriptions } = useSubscriptions();
  const { data: subscriptionProviders } = useSubscriptionProviders();
  return (
    <>
      {subscriptionProviders.map((subscriptionProvider) => (
        <div>{subscriptionProvider.name}</div>
      ))}
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
        paddingX={5}
        paddingY={5}
        gap={5}
      >
        {subscriptions.map((subscription) => (
          <SubCard subscription={subscription} key={subscription.id} />
        ))}
      </Grid>
    </>
  );
};

export default SubGrid;
