import { Subscription } from '../models/Subscription';
import {
  Card,
  CardBody,
  CardHeader,
  GridItem,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';

interface Props {
  subscription: Subscription;
}
const SubCard = ({ subscription }: Props) => {
  function manageDate(date: Date | string): Date {
    return typeof date === 'string' ? new Date(date) : date;
  }
  function formatDate(date: Date) {
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

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
          <CardBody>
            <HStack justifyContent={'space-between'}>
              <VStack align={'start'} spacing={2}>
                <span>Last Occurrence Date:</span>{' '}
                <span> {formattedLastOccurrenceDate}</span>
              </VStack>
              <VStack align={'start'} spacing={2}>
                <span>Next Occurrence Date:</span>{' '}
                <span> {formattedNextOccurrenceDate}</span>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </GridItem>
    </>
  );
};

export default SubCard;
