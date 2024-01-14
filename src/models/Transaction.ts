import { Subscription } from './Subscription';

export interface Transaction {
  id: number;
  subscription: Subscription;
  timestamp: Date;
  status: string;
}
