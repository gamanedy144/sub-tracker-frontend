import { Subscription } from '../models/Subscription';
import {
  Card,
  CardBody,
  CardHeader,
  GridItem,
  HStack,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { formatDate, manageDate } from '../utils/dateFormatting';
import { mapToDisplayText } from '../utils/subscriptionEnums';
import { capitalizeFirstLetter } from '../utils/capitalize';

interface Props {
  subscription: Subscription;
}
const SubCard = ({ subscription }: Props) => {
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
    <>
      <GridItem>
        <Card>
          <CardHeader>
            <Heading>{subscription.subscriptionName}</Heading>
          </CardHeader>
          <CardBody width="100%">
            <VStack align={'start'} width="100%" gap={2}>
              <Text>
                <strong>Provider:</strong> {subscription.provider.name}
              </Text>
              <Text>
                <strong>Details:</strong> {subscription.provider.details}
              </Text>

              <Text>
                <strong>Type:</strong>{' '}
                {capitalizeFirstLetter(subscription.type)}
              </Text>
              <Text>
                <strong>Category:</strong>{' '}
                {capitalizeFirstLetter(subscription.category)}
              </Text>
              <Text>
                <strong>Price:</strong> £{subscription.price}
              </Text>

              <HStack justifyContent={'space-between'} width="100%">
                <VStack align={'start'} spacing={2}>
                  <span>Last Occurrence Date:</span>{' '}
                  <span> {formattedLastOccurrenceDate}</span>
                </VStack>
                <VStack align={'start'} spacing={2}>
                  <span>Next Occurrence Date:</span>{' '}
                  <span> {formattedNextOccurrenceDate}</span>
                </VStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </GridItem>
    </>
  );
};

export default SubCard;
