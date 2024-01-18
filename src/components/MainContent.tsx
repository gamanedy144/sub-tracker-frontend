import React, { FC } from 'react';
import { Box, Divider, HStack, Heading, Icon, Text } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

// Import your custom components for different routes
// import Insight from './Insight';
// import Report from './Report';
// import Settings from './Settings';
import SubGrid from './SubGrid';
import Report from './Report';
import { capitalizeFirstLetter } from '../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
function Insight() {
  return <Box p={4}>Insight Content</Box>;
}

function Settings() {
  return <Box p={4}>Settings Content</Box>;
}
interface MainContentProps {
  routeTitle: string;
}
const MainContent: FC<MainContentProps> = ({ routeTitle }) => {
  return (
    <Box p={4} height="100%" overflowY="auto">
      <Heading mb={4}>
        <HStack justifyContent={'space-between'} width="100%">
          <Text>{routeTitle ? capitalizeFirstLetter(routeTitle) : 'Home'}</Text>
          {['home', 'report'].includes(routeTitle) && (
            <Icon
              as={FontAwesomeIcon}
              icon={faFilter}
              boxSize={10}
              color={'white.500'}
              _hover={{
                color: 'gray.300',
                cursor: 'pointer', // Add this line to show that the icon is clickable
              }}
            />
          )}
        </HStack>
      </Heading>
      <Divider my={2} />

      <Routes>
        <Route path="/home" element={<SubGrid />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
        {/* Add more routes as needed */}
      </Routes>
    </Box>
  );
};

export default MainContent;
