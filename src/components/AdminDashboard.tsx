import { useState } from 'react';
import UsersCreatedLineChart from './charts/UsersCreatedLineChart';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Textarea,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react';

import moment from 'moment';
import UsersList from './UsersList';
import SubscriptionProvidersList from './SubscriptionProvidersList';
import { useSubscriptionProvidersService } from '../services/useSubscriptionProvidersService';
import { subscriptionProviderSchema } from '../models/SubscriptionProvider';
import { fromZodError } from 'zod-validation-error';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { saveSubscriptionProvider, updateSubscriptionProvider } =
    useSubscriptionProvidersService();
  const [initialFormData, setInitialFormData] = useState({
    name: '',
    details: '',
  });
  const [formData, setFormData] = useState({ ...initialFormData });
  const [isAddingSubscriptionProvider, setIsAddingSubscriptionProvider] =
    useState(false);
  const handleOnClick = () => {
    setIsAddingSubscriptionProvider(true);
  };
  const handleFormSubmit = async (event) => {
    console.log('ceau futute n gura');
    try {
      subscriptionProviderSchema.parse(formData);
      await saveSubscriptionProvider(formData);
      setIsAddingSubscriptionProvider(false);
      console.log(formData);
    } catch (error) {
      const validationError = fromZodError(error);
      toast.error(`Failed to register: ${validationError}`);
    }
  };
  const resetInputs = () => {
    setFormData({
      name: '',
      details: '',
    });
  };
  return (
    <GridItem>
      <Grid
        templateAreas={` "chart list list list" 
                          "providers providers providers update-provider"`}
        templateColumns={{ sm: '1fr', lg: '550px 1fr 1fr 1fr' }}
        templateRows={'1fr 1fr'}
        paddingX={10}
        paddingY={5}
        gap={5}
        height="90%"
      >
        <GridItem area="chart">
          <UsersCreatedLineChart />
        </GridItem>

        <GridItem area="list" overflowY="auto" height="80%">
          <UsersList />
        </GridItem>
        <GridItem area="providers" overflowY="auto" height="100%">
          <SubscriptionProvidersList handleOnClick={handleOnClick} />
        </GridItem>
        <GridItem area="update-provider" height="100%">
          <Card
            textAlign={'center'}
            height="100%"
            width="100%"
            justifySelf="center"
            padding={5}
          >
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <Heading fontSize={28} mb={-5}>
                  Add Provider
                </Heading>
              </CardHeader>
              <CardBody height="100%">
                <VStack
                  justifyContent={'center'}
                  display={'flex'}
                  alignItems={'center'}
                  height={'100%'}
                >
                  <VStack gap={5} width="100%">
                    <FormControl>
                      <FormLabel>Provider Name</FormLabel>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Details</FormLabel>
                      <Textarea
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            details: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </VStack>
                  <HStack
                    display="flex"
                    gap={5}
                    alignItems="center"
                    justifyContent="center"
                    marginTop={5}
                  >
                    <Button type="submit" backgroundColor="green.500">
                      <Text>Register</Text>
                    </Button>
                    <Button onClick={resetInputs} backgroundColor="red.400">
                      <Text>Cancel</Text>
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </form>
          </Card>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default AdminDashboard;
