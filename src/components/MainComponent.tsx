import {
  Card,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
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
  const { colorMode } = useColorMode();
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
      <GridItem area="aside" height="100%" overflowY="auto">
        <Card
          height={'100%'}
          bg={
            colorMode === 'dark'
              ? 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(46,55,72,1) 78%, rgba(46,55,72,1) 100%);'
              : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(234,240,255,1) 63%, rgba(188,211,255,1) 100%);'
          }
        >
          <SideBar
            shouldShowSidebar={shouldShowSidebar!}
            onToggleSidebar={handleToggleSidebar}
          />
        </Card>
      </GridItem>

      <GridItem area="main" overflowY="auto">
        <Card
          height={'100%'}
          bg={
            colorMode === 'dark'
              ? 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(29,35,46,1) 78%, rgba(22,23,33,1) 100%);'
              : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(234,240,255,1) 63%, rgba(188,211,255,1) 100%);'
          }
        >
          <MainContent routeTitle={routeTitle} />
        </Card>
      </GridItem>
    </Grid>
  );
};

export default MainComponent;
