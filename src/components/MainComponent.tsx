import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
interface MainComponentProps {}
const MainComponent: React.FC<MainComponentProps> = () => {
  const shouldShowSidebar = useBreakpointValue({ base: false, lg: true });
  const [expanded, setExpanded] = useState(shouldShowSidebar);

  const handleToggleSidebar = (newExpanded: boolean) => {
    setExpanded(newExpanded);
  };
  const location = useLocation();
  const routeTitle = location.pathname.substring(1);
  return (
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
      <Toaster position="top-right" />
      <GridItem area="aside" bg="gold" height="100%" overflowY="auto">
        <SideBar
          shouldShowSidebar={shouldShowSidebar!}
          onToggleSidebar={handleToggleSidebar}
        />
      </GridItem>

      <GridItem area="main" bg="dodgerblue" overflowY="auto">
        <MainContent routeTitle={routeTitle} />
      </GridItem>
    </Grid>
  );
};

export default MainComponent;
