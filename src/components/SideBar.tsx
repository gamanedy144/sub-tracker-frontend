import { FC, useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  IconButton,
  Box,
  Image,
  Divider,
  Text,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
interface SideBarProps {
  shouldShowSidebar: boolean;
  onToggleSidebar: (expanded: boolean) => void;
}
const SideBar: FC<SideBarProps> = ({ shouldShowSidebar, onToggleSidebar }) => {
  const [expanded, setExpanded] = useState(shouldShowSidebar);
  useEffect(() => {
    setExpanded(shouldShowSidebar);
  }, [shouldShowSidebar]);

  const handleToggleSidebar = () => {
    setExpanded(!expanded);
    onToggleSidebar(!expanded);
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
        <NavLink to="/" showText={expanded} iconName="home">
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
      >
        <Image boxSize="32px" borderRadius={8} src="public/default.jpg"></Image>
        <Box
          overflow={'hidden'}
          transition={'width 0.3s'}
          display={expanded ? 'flex' : 'none'}
          css={{ overflow: 'hidden' }}
        >
          Sub Tracker
        </Box>
      </HStack>

      {/* Add more links as needed */}
    </VStack>
  );
};

export default SideBar;
