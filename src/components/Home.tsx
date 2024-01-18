import SubCard from './SubCard';
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import useSubscriptions from '../hooks/useSubscriptions';

import UpdateSubCard from './UpdateSubCard';
import { useState } from 'react';
import SubscriptionDetails from './SubscriptionDetails';
import { Subscription } from '../models/Subscription';

const Home = () => {
  const { data: subscriptions } = useSubscriptions();

  const [isAdding, setIsAdding] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const onClickHandle = () => {
    setIsAdding(!isAdding);
    setSubscription(null);
  };
  const handleClickSubscription = (subscription: Subscription) => {
    setIsAdding(false);
    setSubscription(subscription);
  };

  return (
    <>
      <Grid
        templateAreas={` "subgrid details"`}
        templateColumns={{
          sm: '1fr',
          lg: '3fr 1fr',
        }}
        paddingX={10}
        paddingY={5}
        gap={5}
        height="90%"
      >
        <GridItem area="subgrid">
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
            templateRows="1fr"
            paddingX={5}
            gap={5}
            className="sub-grid"
            mb={5}
          >
            {subscriptions.map((subscription) => (
              <SubCard
                subscription={subscription}
                key={subscription.id}
                onClick={handleClickSubscription}
              />
            ))}
          </Grid>
        </GridItem>
        <GridItem area="details">
          <VStack width="100%">
            <UpdateSubCard clicked={isAdding} onClickHandle={onClickHandle} />
            {!isAdding &&
              (subscription ? (
                <SubscriptionDetails subscription={subscription} />
              ) : (
                <Card width="100%">
                  <CardHeader mb={-5}>
                    <Heading fontSize={32}>Details</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>Click on any subscription to show details</Text>
                  </CardBody>
                </Card>
              ))}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
