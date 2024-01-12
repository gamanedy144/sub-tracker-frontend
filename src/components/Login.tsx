import React, { FormEvent, useState } from 'react';
import { User, authenticationSchema } from '../models/Account';
import * as jose from 'jose';
import AccountService from '../services/useAccountService';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  VStack,
  Text,
  color,
} from '@chakra-ui/react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useAccountService } from '../services/useAccountService';
const Login = () => {
  const navigate = useNavigate();
  const [initialFormData, setInitialFormData] = useState({
    email: '',
    password: '',
  });
  const [formData, setFormData] = useState({ ...initialFormData });
  const signIn = useSignIn();
  const { authenticate } = useAccountService();

  const handleFormSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      authenticationSchema.parse(formData);
      const response = await authenticate(formData);
      const decodedToken = jose.decodeJwt(response.data.token);
      const fullName = decodedToken?.fullName || '';
      const role = decodedToken?.role || '';
      console.log(response);
      signIn({
        auth: { token: response.data.token, type: 'Bearer' },
        userState: {
          email: formData.email,
          fullName: fullName,
          role: role,
        },
      });

      navigate('/home');
    } catch (error) {
      console.error('Invalid credentials: ', error.errors);
    }
  };
  const resetInputs = () => {
    setFormData({
      email: '',
      password: '',
    });
  };
  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop={120}>
      <Card
        textAlign={'center'}
        height="100%"
        width="40%"
        justifySelf="center"
        padding={5}
      >
        <form onSubmit={handleFormSubmit}>
          <CardHeader>
            <Heading>Login</Heading>
          </CardHeader>
          <CardBody>
            <VStack
              justifyContent={'center'}
              display={'flex'}
              alignItems={'center'}
              height={'100%'}
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  // ref={endDateRef}
                />
              </FormControl>

              <HStack>
                <Text>Don't have an account?</Text>
                <Text
                  _hover={{
                    color: 'blue.400',
                  }}
                >
                  <Link to="/auth/register"> Register now!</Link>
                </Text>
              </HStack>

              <HStack
                display="flex"
                gap={5}
                alignItems="center"
                justifyContent="center"
                marginTop={5}
              >
                <Button type="submit" backgroundColor="green.500">
                  <Text>Login</Text>
                </Button>
                <Button onClick={resetInputs} backgroundColor="red.400">
                  <Text>Cancel</Text>
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
