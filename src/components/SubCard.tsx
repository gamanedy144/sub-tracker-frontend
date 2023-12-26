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
import { formatDate, manageDate } from '../utils/dateFormatting';

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
