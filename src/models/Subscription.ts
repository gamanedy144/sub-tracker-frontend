import { SubscriptionProvider } from './SubscriptionProvider';

export interface Subscription {
  subscriptionProvider: SubscriptionProvider;
  name: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}
