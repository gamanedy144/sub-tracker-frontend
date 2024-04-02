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
  const { sortedData: subscriptions } = useSubscriptions();

  const [isAdding, setIsAdding] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>();
  const [subscriptionToEdit, setSubscriptionToEdit] =
    useState<Subscription | null>();

  const onClickHandle = () => {
    setIsAdding(!isAdding);
    setSubscriptionToEdit(null);
    setSubscription(null);
  };

  const handleClickSubscription = (subscription: Subscription) => {
    setIsAdding(false);
    setSubscription(subscription);
  };

  const handleClickEdit = (subscription: Subscription) => {
    setIsAdding(!isAdding);
    setSubscriptionToEdit(subscription);
  };

  return (
    <>
      {subscriptions && (
        <Grid
          templateAreas={
            subscriptions.length > 0 ? ` "subgrid details"` : ` "details"`
          }
          templateColumns={
            subscriptions.length > 0
              ? {
                  sm: '1fr',
                  lg: '1fr 400px',
                }
              : {
                  sm: '1fr',
                  lg: '1fr',
                }
          }
          templateRows={subscriptions.length > 0 ? 'auto' : '1fr'}
          paddingX={5}
          paddingY={5}
          gap={1}
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
          <GridItem
            area="details"
            display={subscriptions.length > 0 ? '' : 'flex'}
            flexDirection={'column'}
            alignItems={subscriptions.length > 0 ? '' : 'center'}
            justifyContent={subscriptions.length > 0 ? '' : 'center'}
            height={subscriptions.length > 0 ? 'auto' : '100%'}
          >
            <VStack
              width={subscriptions.length > 0 ? '100%' : '30%'}
              alignItems={subscriptions.length > 0 ? '' : 'center'}
              justifyContent={subscriptions.length > 0 ? '' : 'center'}
              height={subscriptions.length > 0 ? 'auto' : '100%'}
            >
              {!isAdding &&
                subscriptions.length > 0 &&
                (subscription ? (
                  <SubscriptionDetails
                    subscription={subscription}
                    handleEditClick={handleClickEdit}
                  />
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
              <UpdateSubCard
                clicked={isAdding}
                onClickHandle={onClickHandle}
                subscriptionToUpdate={subscriptionToEdit}
              />
            </VStack>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Home;
