import { HStack, Text, IconButton } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FC } from 'react';

interface NavBarProps {
  isOpen: boolean;
  onToggle: () => void;
}
const NavBar: FC<NavBarProps> = ({ isOpen, onToggle }) => {
  return (
    <HStack justifyContent="space-between" padding={'10px'}>
      <IconButton
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Toggle Sidebar"
        onClick={onToggle}
        display={{ base: 'flex', lg: 'none' }}
        padding="0"
        margin="0"
      />
      <Text>Sub Tracker</Text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
