import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Subscription } from '../models/Subscription';
import { capitalizeFirstLetter } from '../utils/capitalize';
interface SubscriptionDetailsProps {
  subscription: Subscription;
}
const SubscriptionDetails: FC<SubscriptionDetailsProps> = ({
  subscription,
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading>{subscription.subscriptionName}</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          <strong>Provider:</strong> {subscription.provider.name}
        </Text>
        <Text>
          <strong>Type:</strong> {capitalizeFirstLetter(subscription.type)}
        </Text>
        <Text>
          <strong>Category:</strong>{' '}
          {capitalizeFirstLetter(subscription.category) || 'Not set yet'}
        </Text>
        <Text>
          <strong>Price:</strong> £{subscription.price || 'Not set yet'}
        </Text>
        {subscription.lastOccurrenceDate && (
          <Text>
            <strong>Last Occurence Date:</strong>{' '}
            {subscription.lastOccurrenceDate.toString()}
          </Text>
        )}
        {subscription.nextOccurrenceDate && (
          <Text>
            <strong>Next Occurence Date:</strong>{' '}
            {subscription.nextOccurrenceDate.toString()}
          </Text>
        )}
        {/* Add more details as needed */}
      </CardBody>
    </Card>
  );
};

export default SubscriptionDetails;
