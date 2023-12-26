import {
  Card,
  CardBody,
  CardHeader,
  GridItem,
  HStack,
  Heading,
  Icon,
  Button,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

interface UpdateSubCardProps {
  clicked: boolean;
  onClickHandle: () => void;
}
const UpdateSubCard: FC<UpdateSubCardProps> = ({ clicked, onClickHandle }) => {
  return (
    <>
      <GridItem>
        {!clicked ? (
          <Card textAlign={'center'} height="100%">
            <CardHeader>
              <Heading>Add new sub</Heading>
            </CardHeader>
            <CardBody>
              <HStack
                justifyContent={'center'}
                display={'flex'}
                alignItems={'center'}
              >
                <Icon
                  as={FontAwesomeIcon}
                  icon={faPlusCircle}
                  boxSize={12}
                  onClick={onClickHandle}
                />
              </HStack>
            </CardBody>
          </Card>
        ) : (
          <Card textAlign={'center'} height="100%">
            <CardHeader>
              <Heading>Title</Heading>
            </CardHeader>
            <CardBody>
              <HStack
                justifyContent={'center'}
                display={'flex'}
                alignItems={'center'}
              >
                <Icon as={FontAwesomeIcon} icon={faPlusCircle} boxSize={12} />;
              </HStack>
            </CardBody>
          </Card>
        )}
      </GridItem>
    </>
  );
};

export default UpdateSubCard;
