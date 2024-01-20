import {
  AuthenticationRequest,
  RegisterRequest,
  UpdatePasswordRequest,
  UpdateRequest,
  User,
} from '../models/Account';
import { apiService } from './api-client';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

export const useAccountService = () => {
  const authHeader = useAuthHeader();
  const controller = new AbortController();

  const authenticate = async (credentials: AuthenticationRequest) => {
    try {
      const response = await apiService.post('/auth/authenticate', credentials);
      return response;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };
  const register = async (accountDetails: RegisterRequest) => {
    try {
      const response = await apiService.post('/auth/register', accountDetails);
      return response;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };
  const updateUser = async (accountDetails: UpdateRequest) => {
    try {
      const response = await apiService.put('/user/update', accountDetails, {
        signal: controller.signal,
        headers: { Authorization: authHeader },
      });
      return response;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };

  const fetchUserDetails = async (email: string) => {
    try {
      const response = await apiService.get<User>(
        'user/find-by-email/' + email,
        {
          signal: controller.signal,
          headers: { Authorization: authHeader },
        }
      );
      return response;
    } catch (error) {
      console.error('Error getting data:', error.message);
      throw new Error(`Failed to make GET request: ${error.message}`);
    }
  };

  const updatePassword = async (password: UpdatePasswordRequest) => {
    try {
      console.log('ceau sunt aici');
      console.log(password);

      const response = await apiService.post(
        '/auth/change-password',
        password,
        {
          signal: controller.signal,
          headers: { Authorization: authHeader },
        }
      );
      console.log(response);
      return response;
      // const response = await apiService.put('/user/update-password', password, {
      //   signal: controller.signal,
      //   headers: { Authorization: authHeader },
      // });
      // return response;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw new Error(`Failed to make POST request: ${error.message}`);
    }
  };
  return {
    authenticate,
    register,
    fetchUserDetails,
    updateUser,
    updatePassword,
  };
};
