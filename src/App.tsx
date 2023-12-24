import {
  Box,
  Grid,
  GridItem,
  useDisclosure,
  useBreakpointValue,
  HStack,
} from '@chakra-ui/react';

import NavBar from './components/NavBar';
import SubGrid from './components/SubGrid';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';

function Insight() {
  return <Box p={4}>Insight Content</Box>;
}

function Report() {
  return <Box p={4}>Report Content</Box>;
}
function Settings() {
  return <Box p={4}>Settings Content</Box>;
}
function App() {
  const { isOpen, onToggle } = useDisclosure();

  const shouldShowSidebar = useBreakpointValue({ base: isOpen, lg: true });

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '1fr 3fr',
        }}
        templateRows={{
          base: 'auto 1fr', // Auto for NavBar, 1fr for the rest
          lg: 'auto 1fr', // Auto for NavBar on large screens
        }}
        paddingX={10}
        paddingY={5}
        gap={5}
        height="100vh"
      >
        <GridItem area="nav" bg="coral">
          <NavBar onToggle={onToggle} isOpen={isOpen} />
        </GridItem>
        {shouldShowSidebar && (
          <GridItem area="aside" bg="gold" height="100%" overflowY="auto">
            <SideBar />
          </GridItem>
        )}

        <GridItem area="main" bg="dodgerblue">
          <Box p={4} height="100%" overflowY="auto">
            <Routes>
              <Route path="/" element={<SubGrid />} />
              <Route path="/insight" element={<Insight />} />
              <Route path="/report" element={<Report />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
