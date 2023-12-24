import { Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import SubGrid from './components/SubGrid';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        paddingX={10}
        paddingY={5}
        gap={5}
      >
        <GridItem area="nav" bg="coral">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" bg="gold">
            <SideBar />
          </GridItem>
        </Show>
        <GridItem area="main" bg="dodgerblue">
          <SubGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
