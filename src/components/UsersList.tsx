import {
  Box,
  GridItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import useUsers from '../hooks/useUsers';
import moment from 'moment';

const UsersList = () => {
  const { sortedData: users } = useUsers();
  const toUserFriendlyDate = (date: Date) => {
    const momentDate = moment(date);
    return momentDate.format('YYYY-MM-DD HH:mm:ss');
  };
  return (
    <>
      {users && (
        <Box height="100%" overflowY="auto">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>
                  <Box
                    as="span"
                    fontWeight="bold"
                    fontSize={16}
                    color={'white'}
                  >
                    Email
                  </Box>
                </Th>
                <Th>
                  <Box
                    as="span"
                    fontWeight="bold"
                    fontSize={16}
                    color={'white'}
                  >
                    First Name
                  </Box>
                </Th>
                <Th>
                  <Box
                    as="span"
                    fontWeight="bold"
                    fontSize={16}
                    color={'white'}
                  >
                    Last Name
                  </Box>
                </Th>
                <Th>
                  <Box
                    as="span"
                    fontWeight="bold"
                    fontSize={16}
                    color={'white'}
                  >
                    Created at
                  </Box>
                </Th>
                <Th>
                  <Box
                    as="span"
                    fontWeight="bold"
                    fontSize={16}
                    color={'white'}
                  >
                    Role
                  </Box>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.email}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{toUserFriendlyDate(user.createTs)}</Td>
                  <Td>{user.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default UsersList;
