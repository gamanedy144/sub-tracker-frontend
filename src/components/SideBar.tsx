import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
const SideBar = () => {
  const location = useLocation();

  return (
    <VStack spacing={4} align="start" p={4}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text fontWeight={location.pathname === '/' ? 'bold' : 'normal'}>
          Home
        </Text>
      </Link>
      <Link to="/insight" style={{ textDecoration: 'none' }}>
        <Text fontWeight={location.pathname === '/insight' ? 'bold' : 'normal'}>
          Insight
        </Text>
      </Link>
      <Link to="/report" style={{ textDecoration: 'none' }}>
        <Text fontWeight={location.pathname === '/report' ? 'bold' : 'normal'}>
          Report
        </Text>
      </Link>
      <Link to="/settings" style={{ textDecoration: 'none' }}>
        <Text
          fontWeight={location.pathname === '/settings' ? 'bold' : 'normal'}
        >
          Settings
        </Text>
      </Link>
      {/* Add more links as needed */}
    </VStack>
  );
};

export default SideBar;
