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
  Divider,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { formatDate, manageDate } from '../utils/dateFormatting';
import { mapToDisplayText } from '../utils/subscriptionEnums';
import { capitalizeFirstLetter } from '../utils/capitalize';
import { cardColors, typeColors } from '../resources/theme';

interface Props {
  subscription: Subscription;
  onClick: (subscription: Subscription) => void;
}
const SubCard = ({ subscription, onClick }: Props) => {
  const backgroundColor = cardColors[subscription.type.toLowerCase()] || 'gray';
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <GridItem>
        <Card
          backgroundColor={backgroundColor}
          onClick={() => onClick(subscription)}
          cursor={'pointer'}
          // boxShadow={'1px 2px 0.5px 0.5px'}
        >
          <CardHeader mb={-5}>
            <Heading fontSize={32}>{subscription.subscriptionName}</Heading>
            <Divider
              pt={2}
              textAlign={'center'}
              justifySelf={'center'}
              borderColor={colorMode === 'dark' ? 'white' : 'black'}
            />
          </CardHeader>

          <CardBody width="100%">
            <Box>
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
            </Box>
          </CardBody>
        </Card>
      </GridItem>
    </>
  );
};

export default SubCard;
