import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Subscription } from '../models/Subscription';
import { capitalizeFirstLetter } from '../utils/capitalize';
import { formatDate, manageDate } from '../utils/dateFormatting';
interface SubscriptionDetailsProps {
  subscription: Subscription;
  handleEditClick: (subscription: Subscription) => void;
}
const SubscriptionDetails: FC<SubscriptionDetailsProps> = ({
  subscription,
  handleEditClick,
}) => {
  const lastOccurrenceDate = subscription.lastOccurrenceDate
    ? manageDate(subscription.lastOccurrenceDate)
    : manageDate(subscription.startDate);
  const formattedLastOccurrenceDate = lastOccurrenceDate
    ? formatDate(lastOccurrenceDate)
    : 'N/A';
  const nextOccurrenceDate = manageDate(subscription.nextOccurrenceDate);
  const formattedNextOccurrenceDate = nextOccurrenceDate
    ? formatDate(nextOccurrenceDate)
    : 'N/A';
  return (
    <Card height="100%">
      <CardHeader mb={-5}>
        <Heading fontSize={32}>{subscription.subscriptionName}</Heading>
      </CardHeader>
      <CardBody>
        <VStack align={'start'} width="100%" gap={2}>
          <Text>
            <strong>Provider:</strong> {subscription.provider.name}
          </Text>
          <Text>
            <strong>Provider details:</strong> {subscription.provider.details}
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
          <Text>
            <strong>Start date:</strong>{' '}
            {formatDate(manageDate(subscription.startDate))}
          </Text>
          <Text>
            <strong>End date:</strong>{' '}
            {subscription.endDate
              ? formatDate(manageDate(subscription.endDate))
              : 'No end date set'}
          </Text>
          {subscription.lastOccurrenceDate && (
            <Text>
              <strong>Last Occurence Date:</strong>{' '}
              {formattedLastOccurrenceDate}
            </Text>
          )}
          {subscription.nextOccurrenceDate && (
            <Text>
              <strong>Next Occurence Date:</strong>{' '}
              {formattedNextOccurrenceDate}
            </Text>
          )}
          <button onClick={() => handleEditClick(subscription)}>
            Edit sub
          </button>
        </VStack>
        {/* Add more details as needed */}
      </CardBody>
    </Card>
  );
};

export default SubscriptionDetails;
