// AccountDetails.js
import { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';

const AccountDetails = ({ userData, onUpdateUser }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setFormData({ ...userData });
    setDirty(false);
  }, [userData]);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setDirty(true);
  };

  const handleFormSubmit = async () => {
    // Perform any validation or additional logic before updating the user
    try {
      await onUpdateUser(formData);
      toast.success(
        'Account data changed successfully! You may have to relog to apply changes.'
      );
      setDirty(false);
    } catch {
      (error) => {
        toast.error(error.message);
      };
    }
  };

  const resetInputs = () => {
    setFormData({ ...userData });
    setDirty(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <VStack>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={formData.appUsername}
            onChange={(e) => handleFieldChange('appUsername', e.target.value)}
          />
        </FormControl>
        <Button type="submit" isDisabled={!dirty} backgroundColor={'green.500'}>
          Save Changes
        </Button>
        <Button onClick={resetInputs}>Cancel</Button>
      </VStack>
    </form>
  );
};

export default AccountDetails;
