import { Subscription } from '../models/Subscription';
import useData from './useData';

const useSubscriptions = () => useData<Subscription>('/subscription');

export default useSubscriptions;
