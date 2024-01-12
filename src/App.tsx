import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import SideBar from './components/SideBar';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import Authentication from './components/Authentication';
import MainComponent from './components/MainComponent';
import RequireAuth from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import { Toaster } from 'react-hot-toast';
function App() {
  const shouldShowSidebar = useBreakpointValue({ base: false, lg: true });
  const [expanded, setExpanded] = useState(shouldShowSidebar);

  const handleToggleSidebar = (newExpanded: boolean) => {
    setExpanded(newExpanded);
  };
  const isLoggedIn = false;

  return (
    <>
      <Routes>
        <Route path={'/auth/*'} element={<Authentication />} />
        {/* <Route
        path={'/home'}
        element={
          <RequireAuth fallbackPath={'/login'}>
            <MainComponent
              shouldShowSidebar={shouldShowSidebar}
              expanded={expanded}
              onToggleSidebar={handleToggleSidebar}
            />
          </RequireAuth>
        }
      /> */}
        <Route element={<AuthOutlet fallbackPath="/auth/login" />}>
          <Route
            path={'/*'}
            element={
              <MainComponent
                shouldShowSidebar={shouldShowSidebar}
                expanded={expanded}
                onToggleSidebar={handleToggleSidebar}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
