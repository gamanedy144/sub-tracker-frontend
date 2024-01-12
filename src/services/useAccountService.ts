import {
  AuthenticationRequest,
  RegisterRequest,
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
  return { authenticate, register, fetchUserDetails };
};
