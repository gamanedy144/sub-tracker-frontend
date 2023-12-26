import React, { FC } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

// Import your custom components for different routes
// import Insight from './Insight';
// import Report from './Report';
// import Settings from './Settings';
import SubGrid from './SubGrid';
import { capitalizeFirstLetter } from '../utils/capitalize';
function Insight() {
  return <Box p={4}>Insight Content</Box>;
}

function Report() {
  return <Box p={4}>Report Content</Box>;
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
        {routeTitle ? capitalizeFirstLetter(routeTitle) : 'Home'}
      </Heading>
      <Routes>
        <Route path="/" element={<SubGrid />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
        {/* Add more routes as needed */}
      </Routes>
    </Box>
  );
};

export default MainContent;
