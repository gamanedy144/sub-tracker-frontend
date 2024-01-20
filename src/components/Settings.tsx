import ColorModeSwitch from './ColorModeSwitch';
import { useCallback, useEffect, useState } from 'react';
import { useAccountService } from '../services/useAccountService';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import AccountDetailsForm from './AccountDetails';
import ChangePasswordForm from './ChangePassword';

const Settings = () => {
  const currentUser = useAuthUser();

  const { fetchUserDetails, updateUser, updatePassword } = useAccountService();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    appUsername: '',
  });
  const [formData, setFormData] = useState({ ...userData });

  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const fetchUserDetailsCallback = useCallback(async () => {
    try {
      const { data: userDetails } = await fetchUserDetails(currentUser.email);
      console.log(userDetails);
      setUserData(userDetails);
      setFormData(userDetails);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        if (isMounted) {
          await fetchUserDetailsCallback();
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [fetchUserDetailsCallback]);

  const handleToggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };
  return (
    <Grid
      templateAreas={` "account-details reset-password"
    "account-details theme"
    "account-details empty"
    "account-details empty"`}
      templateColumns={{
        sm: '1fr',
        lg: '2fr 1fr',
      }}
      paddingX={10}
      paddingY={5}
      gap={5}
      height="90%"
      width="100%"
    >
      <GridItem area={'account-details'}>
        <Card
          textAlign={'center'}
          height="100%"
          justifySelf="center"
          padding={5}
        >
          <CardHeader mb={-5}>
            <Heading fontSize={32}>Account Settings</Heading>
          </CardHeader>
          <CardBody>
            <AccountDetailsForm userData={userData} onUpdateUser={updateUser} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem area={'reset-password'}>
        <Card
          textAlign={'center'}
          height="100%"
          justifySelf="center"
          padding={2}
        >
          <CardHeader mb={-5}>
            <Heading fontSize={32}>Password reset</Heading>
          </CardHeader>
          <CardBody>
            <VStack height="100%" gap={4}>
              <ChangePasswordForm
                handleChangePassword={updatePassword}
                showForm={showChangePasswordForm}
              />
              <Button type="submit" onClick={handleToggleChangePasswordForm}>
                {showChangePasswordForm
                  ? 'Cancel Change Password'
                  : 'Change Password'}
              </Button>
            </VStack>
            {/* ... (rest of the code) */}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem area={'theme'}>
        <Card>
          <CardHeader mb={-5}>
            <Heading fontSize={32}>Toggle theme</Heading>
          </CardHeader>
          <CardBody>
            <ColorModeSwitch />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Settings;
