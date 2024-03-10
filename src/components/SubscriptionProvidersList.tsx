import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import useSubscriptionProviders from '../hooks/useSubscriptionProviders';
import moment from 'moment';

const SubscriptionProvidersList = ({ handleOnClick }) => {
  const { data: subscriptionProviders } = useSubscriptionProviders();
  return (
    <>
      {subscriptionProviders && (
        <Card height="100%">
          <CardHeader>
            <Heading fontSize={28} mb={-5}>
              Subscription Providers
            </Heading>
          </CardHeader>
          <CardBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Provider Name
                    </Box>
                  </Th>
                  <Th>
                    <Box
                      as="span"
                      fontWeight="bold"
                      fontSize={16}
                      color={'white'}
                    >
                      Details
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscriptionProviders.map((provider) => (
                  <Tr key={provider.id}>
                    <Td>{provider.name}</Td>
                    <Td>{provider.details}</Td>
                    <Td></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SubscriptionProvidersList;
