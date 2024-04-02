import React, { FormEvent, useState } from 'react';
import { authenticationSchema, registerSchema } from '../models/Account';
import { useAccountService } from '../services/useAccountService';
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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import toast, { Toaster } from 'react-hot-toast';
import { fromZodError } from 'zod-validation-error';

const Register = () => {
  const [initialFormData, setInitialFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: '',
    appUsername: '',
  });
  const [formData, setFormData] = useState({ ...initialFormData });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { register } = useAccountService();
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleFormSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      registerSchema.parse(formData);
      await register({ ...formData, username: formData.appUsername });
      toast.success('Registration successful!');
      navigate('/auth/login');
    } catch (error) {
      const validationError = fromZodError(error);
      toast.error(`Failed to register: ${validationError}`);
    }
  };
  const resetInputs = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      appUsername: '',
    });
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop={120}>
      <Toaster position="top-right" />
      <Card
        textAlign={'center'}
        height="100%"
        width="40%"
        justifySelf="center"
        padding={5}
      >
        <form onSubmit={handleFormSubmit}>
          <CardHeader>
            <Heading>Register</Heading>
          </CardHeader>
          <CardBody>
            <VStack
              justifyContent={'center'}
              display={'flex'}
              alignItems={'center'}
              height={'100%'}
            >
              <HStack gap={5} width="100%">
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </HStack>
              <HStack gap={5} width="100%">
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
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={formData.appUsername}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appUsername: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </HStack>

              <HStack gap={5} width="100%">
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={handleTogglePasswordVisibility}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                        icon={
                          showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                        }
                        onClick={handleToggleConfirmPasswordVisibility}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </HStack>

              <HStack>
                <Text>Already have an account?</Text>{' '}
                <Text
                  _hover={{
                    color: 'blue.400',
                  }}
                >
                  <Link to="/auth/login">Log in now!</Link>
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
    </Box>
  );
};

export default Register;
