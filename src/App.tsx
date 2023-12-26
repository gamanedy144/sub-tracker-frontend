import {
  Box,
  Grid,
  GridItem,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';

import NavBar from './components/NavBar';
import SubGrid from './components/SubGrid';
import SideBar from './components/SideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MainContent from './components/MainContent';
function App() {
  const shouldShowSidebar = useBreakpointValue({ base: false, lg: true });
  const [expanded, setExpanded] = useState(shouldShowSidebar);

  const handleToggleSidebar = (newExpanded: boolean) => {
    setExpanded(newExpanded);
  };
  const location = useLocation();
  const routeTitle = location.pathname.substring(1);
  return (
    <>
      <Grid
        templateAreas={` "aside main"`}
        templateColumns={{
          sm: 'auto 1fr',
          lg: expanded ? '250px 1fr' : 'auto 1fr',
        }}
        paddingX={10}
        paddingY={5}
        gap={5}
        height="100vh"
      >
        <GridItem area="aside" bg="gold" height="100%" overflowY="auto">
          <SideBar
            shouldShowSidebar={shouldShowSidebar}
            onToggleSidebar={handleToggleSidebar}
          />
        </GridItem>

        <GridItem area="main" bg="dodgerblue">
          <MainContent routeTitle={routeTitle} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
