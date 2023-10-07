import { HStack, Text } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () => {
  return (
    <HStack>
      <Text>Sub Tracker</Text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
