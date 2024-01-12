import { FC, useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  IconButton,
  Box,
  Image,
  Divider,
  Text,
  Icon,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  shouldShowSidebar: boolean;
  onToggleSidebar: (expanded: boolean) => void;
}
const SideBar: FC<SideBarProps> = ({ shouldShowSidebar, onToggleSidebar }) => {
  const [expanded, setExpanded] = useState(shouldShowSidebar);
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    setExpanded(shouldShowSidebar);
  }, [shouldShowSidebar, signOut]);

  const handleToggleSidebar = () => {
    setExpanded(!expanded);
    onToggleSidebar(!expanded);
  };
  const onSignOut = () => {
    signOut();
    navigate('/auth/login');
  };
  return (
    <VStack
      spacing={4}
      align="start"
      p={4}
      height="100%"
      alignItems={expanded ? '' : 'center'}
    >
      <HStack
        justifyContent="space-between"
        padding={'10px'}
        width="100%"
        alignItems="center"
      >
        <Box
          overflow={'hidden'}
          transition={'width 0.3s'}
          display={expanded ? 'flex' : 'none'}
          css={{ overflow: 'hidden' }}
        >
          <Text fontSize={24} fontWeight={'bold'}>
            Sub Tracker
          </Text>
        </Box>
        <IconButton
          icon={expanded ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Sidebar"
          onClick={handleToggleSidebar}
          display={{ base: 'flex', lg: 'flex' }}
          padding="0"
          margin="0"
        />
      </HStack>
      <VStack
        padding={'10px'}
        overflow={'hidden'}
        transition={'width 0.3s'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        css={{ overflow: 'hidden' }}
        gap={4}
      >
        <NavLink to="/home" showText={expanded} iconName="home">
          Home
        </NavLink>
        <NavLink to="/insight" showText={expanded} iconName="insight">
          Insight
        </NavLink>
        <NavLink to="/report" showText={expanded} iconName="report">
          Report
        </NavLink>
        <Divider my={4} />
        <NavLink to="/settings" showText={expanded} iconName="settings">
          Settings
        </NavLink>
      </VStack>

      <HStack
        padding={'10px'}
        width="100%"
        alignItems="center"
        marginTop={'auto'}
        display="flex"
        justifyContent="space-between"
      >
        <Image boxSize="32px" borderRadius={8} src="/default.jpg"></Image>
        <Box
          overflow={'hidden'}
          transition={'width 0.3s'}
          display={expanded ? 'flex' : 'none'}
          css={{ overflow: 'hidden' }}
        >
          {auth.fullName}
        </Box>
        <button onClick={onSignOut}>
          <Icon
            as={FontAwesomeIcon}
            icon={faSignOut}
            boxSize={4}
            _hover={{
              color: 'grey.',
              cursor: 'pointer', // Add this line to show that the icon is clickable
            }}
          />
        </button>
      </HStack>

      {/* Add more links as needed */}
    </VStack>
  );
};

export default SideBar;
