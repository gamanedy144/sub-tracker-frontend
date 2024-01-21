import { FC } from 'react';
import { Box, Divider, HStack, Heading, Icon, Text } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import { capitalizeFirstLetter } from '../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import Insight from './Insight';
import Settings from './Settings';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import AdminDashboard from './AdminDashboard';

interface MainContentProps {
  routeTitle: string;
}
const MainContent: FC<MainContentProps> = ({ routeTitle }) => {
  const currentUser = useAuthUser();
  const routeWords = routeTitle.split('/');
  const title = routeWords[routeWords.length - 1];
  console.log(currentUser.role);
  return (
    <Box p={4} height="100%" overflowY="auto">
      <Heading mb={4}>
        <HStack justifyContent={'space-between'} width="100%">
          <Text>{routeTitle ? capitalizeFirstLetter(title) : 'Home'}</Text>
          {/* {['home', 'report'].includes(routeTitle) && (
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
          )} */}
        </HStack>
      </Heading>
      <Divider my={2} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/admin/dashboard"
          element={
            currentUser && currentUser.role === 'ADMIN' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
      </Routes>
    </Box>
  );
};

export default MainContent;
