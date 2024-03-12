import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Subscription } from '../models/Subscription';
import { capitalizeFirstLetter } from '../utils/capitalize';
import { formatDate, manageDate } from '../utils/dateFormatting';
import { useSubscriptionService } from '../services/useSubscriptionService';
interface SubscriptionDetailsProps {
  subscription: Subscription;
  handleEditClick?: (subscription: Subscription) => void | any;
}
const SubscriptionDetails: FC<SubscriptionDetailsProps> = ({
  subscription,
  handleEditClick,
}) => {
  const { deleteSubscription } = useSubscriptionService();
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
  const handleDeleteClick = (subscriptionId: number) => {
    deleteSubscription(subscriptionId);
    window.location.reload();
  };
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
          <HStack
            width={'100%'}
            justifyContent={'center'}
            mt={5}
            mb={5}
            gap={5}
          >
            <Button
              onClick={() => handleEditClick(subscription)}
              colorScheme="blue"
            >
              Edit sub
            </Button>
            <Button
              onClick={() => handleDeleteClick(subscription.id)}
              type="submit"
              colorScheme="red"
            >
              Delete
            </Button>
          </HStack>
        </VStack>
        {/* Add more details as needed */}
      </CardBody>
    </Card>
  );
};

export default SubscriptionDetails;
