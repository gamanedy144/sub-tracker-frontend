import { Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import MainComponent from './components/MainComponent';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
function App() {
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
          <Route path={'/*'} element={<MainComponent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
