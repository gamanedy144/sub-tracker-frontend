// ChangePasswordForm.js
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { updatePasswordSchema } from '../models/Account';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ChangePasswordForm = ({ handleChangePassword, showForm }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [initialFormData, setInitialFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formData, setFormData] = useState({ ...initialFormData });
  const handleFormSubmit = (event) => {
    event.preventDefault();
    updatePasswordSchema.parse(formData);
    // Validation logic here

    // Call the parent component's function to handle password change
    try {
      handleChangePassword(formData);
      toast.success(
        'Password changed successfully! Please relog to apply changes!'
      );
      signOut();
      navigate('/auth/login');
    } catch {
      (err) => {
        console.log(err);
      };
    }
  };

  if (!showForm) {
    return (
      <VStack
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        height={'100%'}
      >
        <Text>Click the button to change your password</Text>
      </VStack>
    );
  }

  return (
    <VStack
      justifyContent={'space-between'}
      display={'flex'}
      alignItems={'center'}
      height={'100%'}
      gap={2}
    >
      <FormControl>
        <FormLabel>Current Password</FormLabel>
        <InputGroup>
          <Input
            type={showCurrentPassword ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
          />
          <InputRightElement width="3rem">
            <IconButton
              aria-label={
                showCurrentPassword ? 'Hide password' : 'Show password'
              }
              icon={showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={handleToggleCurrentPasswordVisibility}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>New Password</FormLabel>
        <InputGroup>
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <InputRightElement width="3rem">
            <IconButton
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={handleToggleNewPasswordVisibility}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Confirm New Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <InputRightElement width="3rem">
            <IconButton
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
              icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={handleToggleConfirmPasswordVisibility}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        type="submit"
        backgroundColor="green.500"
        onClick={handleFormSubmit}
      >
        <Text>Change Password</Text>
      </Button>
    </VStack>
  );
};

export default ChangePasswordForm;
