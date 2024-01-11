import { useNavigate } from 'react-router-dom';
import { AuthenticationRequest, RegisterRequest } from '../models/Account';
import { apiService } from './api-client';

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
    const response = await apiService.get('user/find-by-email/' + email);
    return response;
  } catch (error) {
    console.error('Error getting data:', error.message);
    throw new Error(`Failed to make GET request: ${error.message}`);
  }
};
export { authenticate, register, fetchUserDetails };
