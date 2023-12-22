import { SubscriptionProvider } from './SubscriptionProvider';

export interface Subscription {
  id: number;
  subscriptionProvider: SubscriptionProvider;
  subscriptionName: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}
