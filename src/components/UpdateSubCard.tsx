import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Heading,
  Icon,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPlusCircle,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FC, FormEvent, useEffect, useState } from 'react';
import useSubscriptionProviders from '../hooks/useSubscriptionProviders';
import {
  mapToBackendValue,
  mapToDisplayText,
  subscriptionTypes,
} from '../utils/subscriptionTypeEnum';
import { Subscription, subscriptionSchema } from '../models/Subscription';
import { useSubscriptionService } from '../services/useSubscriptionService';
import useData from '../hooks/useData';

interface UpdateSubCardProps {
  clicked: boolean;
  onClickHandle: () => void;
}
const UpdateSubCard: FC<UpdateSubCardProps> = ({ clicked, onClickHandle }) => {
  const subscriptionProviders = useSubscriptionProviders();

  const { postSubscription } = useSubscriptionService();
  const { refetch } = useData<Subscription>('/subscription');
  const [loadingProviders, setLoadingProviders] = useState(true);
  const initialProvider =
    subscriptionProviders.data.find(
      (provider) => provider.name === subscriptionProviders.data[0]?.name
    ) || null;
  const initialType = mapToBackendValue(subscriptionTypes[0]) || '';
  useEffect(() => {
    // Check if data is available before setting the initial provider
    if (subscriptionProviders.data.length > 0) {
      setFormData({ ...formData, provider: subscriptionProviders.data[0] });
    }

    // Set loading to false once data is available
    setLoadingProviders(false);
  }, [subscriptionProviders.data]);
  const [initialFormData, setInitialFormData] = useState({
    subscriptionName: '',
    provider: initialProvider,
    type: initialType,
    startDate: '',
    endDate: '',
  });

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormSubmit = (event: FormEvent) => {
    const parsedFormData = {
      ...formData,
      provider: formData.provider,
      type: mapToBackendValue(formData.type),
    };
    try {
      subscriptionSchema.parse(parsedFormData);
      if (JSON.stringify(initialFormData) === JSON.stringify(parsedFormData)) {
        console.log('Form data not changed:', initialFormData);
      }
      console.log('Form data submitted:', parsedFormData);
      postSubscription(parsedFormData);
      resetInputs();
    } catch (error) {
      console.error('Form data is invalid:', error.errors);
    }
  };

  const resetInputs = () => {
    setFormData({
      subscriptionName: '',
      provider: subscriptionProviders.data[0],
      type: initialType,
      startDate: '',
      endDate: '',
    });
  };
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
                height={'100%'}
              >
                <Icon
                  as={FontAwesomeIcon}
                  icon={faPlusCircle}
                  boxSize={12}
                  onClick={onClickHandle}
                  _hover={{
                    color: 'grey.',
                    cursor: 'pointer', // Add this line to show that the icon is clickable
                  }}
                />
              </HStack>
            </CardBody>
          </Card>
        ) : (
          <Card textAlign={'center'} height="100%">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <Heading>
                  <FormControl>
                    <Input
                      type="text"
                      value={formData.subscriptionName}
                      // ref={titleRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscriptionName: e.target.value,
                        })
                      }
                      placeholder="Title"
                    />
                  </FormControl>
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack
                  justifyContent={'center'}
                  display={'flex'}
                  alignItems={'center'}
                  height={'100%'}
                >
                  <HStack width={'100%'}>
                    <FormControl>
                      <FormLabel>Provider</FormLabel>
                      <Select
                        value={formData.provider?.name || ''}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            provider: e.target.value,
                          });
                        }}
                      >
                        {subscriptionProviders.data.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={formData.type || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type: mapToBackendValue(e.target.value),
                          })
                        }
                      >
                        {subscriptionTypes.map((option) => (
                          <option key={option} value={option}>
                            {mapToDisplayText(option)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>
                  <HStack width={'100%'}>
                    <FormControl>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        // ref={startDateRef}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        // ref={endDateRef}
                      />
                    </FormControl>
                  </HStack>

                  <HStack>
                    <button type="submit">
                      <Icon
                        as={FontAwesomeIcon}
                        icon={faCheckCircle}
                        boxSize={12}
                        color={'green.500'}
                        _hover={{
                          color: 'green.300',
                          cursor: 'pointer', // Add this line to show that the icon is clickable
                        }}
                      />
                    </button>
                    <Icon
                      as={FontAwesomeIcon}
                      icon={faXmarkCircle}
                      boxSize={12}
                      color={'red.500'}
                      onClick={onClickHandle}
                      className="XmarkCircle"
                      _hover={{
                        color: 'red.300',
                        cursor: 'pointer', // Add this line to show that the icon is clickable
                      }}
                    />
                  </HStack>
                </VStack>
              </CardBody>
            </form>
          </Card>
        )}
      </GridItem>
    </>
  );
};

export default UpdateSubCard;
