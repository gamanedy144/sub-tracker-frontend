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
import { typeColors } from '../resources/theme';

interface Props {
  subscription: Subscription;
  onClick: (subscription: Subscription) => void;
}
const SubCard = ({ subscription, onClick }: Props) => {
  const backgroundColor = typeColors[subscription.type.toLowerCase()] || 'gray';

  return (
    <>
      <GridItem>
        <Card
          backgroundColor={backgroundColor}
          onClick={() => onClick(subscription)}
          cursor={'pointer'}
        >
          <CardHeader mb={-5}>
            <Heading>{subscription.subscriptionName}</Heading>
          </CardHeader>
          <CardBody width="100%">
            <VStack align={'start'} width="100%" gap={2}>
              <Text>
                <strong>Provider:</strong> {subscription.provider.name}
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
            </VStack>
          </CardBody>
        </Card>
      </GridItem>
    </>
  );
};

export default SubCard;
